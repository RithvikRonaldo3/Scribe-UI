import { Injectable } from '@angular/core';
import * as RecordRTC from 'recordrtc';
import * as moment from 'moment';
import { Observable, Subject } from 'rxjs';
import { USERID } from './constants';

interface RecordedAudioOutput {
  blob: Blob;
  title: string;
}

@Injectable({
  providedIn: 'root',
})
export class AudioScribeService {
  private stream;
  private recorder;
  private interval;
  private startTime;
  private _recorded = new Subject<RecordedAudioOutput>();
  private _recordingTime = new Subject<string>();
  private _recordingFailed = new Subject<string>();
  private _recordingStream = new Subject<any>();
  private userid = USERID;

  getRecordedBlob(): Observable<RecordedAudioOutput> {
    return this._recorded.asObservable();
  }

  getRecordedTime(): Observable<string> {
    return this._recordingTime.asObservable();
  }

  recordingFailed(): Observable<string> {
    return this._recordingFailed.asObservable();
  }

  recordingStream(): Observable<string> {
    return this._recordingStream.asObservable();
  }

  blobRecording(blob: any) {
    console.log('blob', blob);
    return;
  }

  startRecording() {
    if (this.recorder) {
      // It means recording is already started or it is already recording something
      return;
    }

    this._recordingTime.next('00:00');
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((s) => {
        this.stream = s;
        this.record();
      })
      .catch((error) => {
        this._recordingFailed.next();
      });
  }

  abortRecording() {
    this.stopMedia();
  }

  private record() {
    this.recorder = new RecordRTC.StereoAudioRecorder(this.stream, {
      type: 'audio',
      mimeType: 'audio/webm;codecs=pcm',
      timeSlice: 250, // pass this parameter
      getNativeBlob: true,
      desiredSampRate: 16000,
      bufferSize: 4096,
      audioBitsPerSecond: 128000,
      ondataavailable: this.streamData,
    });

    this.recorder.record();
    this.startTime = moment();
    this.interval = setInterval(() => {
      const currentTime = moment();
      const diffTime = moment.duration(currentTime.diff(this.startTime));
      const time =
        this.toString(diffTime.minutes()) +
        ':' +
        this.toString(diffTime.seconds());
      this._recordingTime.next(time);
    }, 1000);
  }

  private toString(value) {
    let val = value;
    if (!value) val = '00';
    if (value < 10) val = '0' + value;
    return val;
  }

  stopRecording() {
    if (this.recorder) {
      this.recorder.stop(
        (blob) => {
          if (this.startTime) {
            const title = encodeURIComponent(
              'audio_' + new Date().getTime() + '.mp3'
            );
            this.stopMedia();
            this._recorded.next({ blob, title });
          }
        },
        () => {
          this.stopMedia();
          this._recordingFailed.next();
        }
      );
    }
  }

  private stopMedia() {
    if (this.recorder) {
      this.recorder = null;
      clearInterval(this.interval);
      this.startTime = null;
      if (this.stream) {
        this.stream.getAudioTracks().forEach((track) => track.stop());
        this.stream = null;
      }
    }
  }

  pauseRecording() {
    this.recorder.pause();
    return;
  }

  resumeRecording() {
    this.recorder.resume();
    return;
  }

  streamData(blob: any) {
    console.log('data', blob);
  }
}
