import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { SpinnerComponent } from 'src/app/reusable/spinner/spinner.component';
import { AudioScribeService } from 'src/app/services/audio-scribe.service';
import { USERID } from 'src/app/services/constants';
import { HttpService } from 'src/app/services/http.service';
import { SocketService } from 'src/app/services/socket.service';
declare var webkitSpeechRecognition;

@Component({
  selector: 'app-record-notes',
  templateUrl: './record-notes.component.html',
  styleUrls: ['./record-notes.component.scss'],
})
export class RecordNotesComponent implements OnInit {
  isRecording = false;
  isRecordingPaused = false;
  recordingInProgress = false;
  recordedTime: any;
  blobUrl: any;
  teste: any;
  vSearch: any;
  loader: boolean = false;
  public speechText: any = '';

  constructor(
    private audioScribeService: AudioScribeService,
    private sanitizer: DomSanitizer,
    private httpService: HttpService,
    private location: Location,
    private router: Router,
    private socket: SocketService
  ) {
    this.audioScribeService
      .recordingFailed()
      .subscribe(() => (this.isRecording = false));
    this.audioScribeService
      .getRecordedTime()
      .subscribe((time) => (this.recordedTime = time));
    this.audioScribeService.getRecordedBlob().subscribe(async (data) => {
      this.teste = data;
      this.blobUrl = this.sanitizer.bypassSecurityTrustUrl(
        URL.createObjectURL(data.blob)
      );
    });
  }

  ngOnInit() {
    this.audioScribeService.recordingStream().subscribe((data: any) => {
      console.log('data', data);      
      // this.socket.sendMessage(data);
    }, (error) => {
      console.log('error', error);      
    })
  }

  startRecording() {
    this.recordingInProgress = true;
    if (!this.isRecording) {
      this.isRecording = true;
      this.audioScribeService.startRecording();
    }
    if ('webkitSpeechRecognition' in window) {
      this.vSearch = new webkitSpeechRecognition();
      this.vSearch.continuous = true;
      this.vSearch.interimresults = true;
      this.vSearch.lang = 'en-US';
      this.vSearch.start();
      var interim_transcript = '';
      var speechText = '';
      this.vSearch.onresult = (event: any) => {
        for (var i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            const transcript =
              (!this.isRecordingPaused ? ` ` : '') +
              event.results[i][0].transcript;
            speechText += transcript;
          } else {
            const transcript =
              (!this.isRecordingPaused ? ` ` : '') +
              event.results[i][0].transcript;
            interim_transcript += transcript;
          }
        }
        this.speechText = speechText;
      };
    } else {
      alert('Your browser does not support voice recognition!');
    }
  }

  abortRecording() {
    if (this.isRecording) {
      this.isRecording = false;
      this.audioScribeService.abortRecording();
      this.recordingInProgress = false;
      this.isRecordingPaused = false;
    }
  }

  stopRecording() {
    if (this.isRecording) {
      this.audioScribeService.stopRecording();
      this.isRecording = false;
      this.vSearch.stop();
      this.recordingInProgress = false;
      this.isRecordingPaused = false;
    }

    if (this.teste) {
      this.transcribAudio();
    } else {
      setTimeout(() => {
        this.stopRecording();
      }, 500);
    }
  }

  clearRecordedData() {
    this.speechText = '';
    this.blobUrl = null;
    this.teste = null;
    this.abortRecording();
  }

  ngOnDestroy() {
    this.abortRecording();
  }

  uploadAudio() {
    this.loader = true;
    this.stopRecording();
  }

  async transcribAudio() {
    const data = {
      fileName: this.teste?.title,
      contentType: 'audio/mpeg',
    };

    await this.httpService
      .getSignedUrl(data)
      .toPromise()
      .then(async (resp: any) => {
        const payload = {
          url: resp.uploadURL,
          data: this.teste.blob,
        };
        await this.httpService
          .uploadAudioS3(payload)
          .toPromise()
          .then((response: any) => {
            console.log('response', response);
          })
          .catch((error) => {
            console.log('error', error);
          });
        const params = {
          userid: USERID,
          job_name: this.teste?.title,
        };
        await this.httpService
          .startTranscribeJob(params)
          .toPromise()
          .then((response: any) => {
            const { data } = response;
            localStorage.setItem(
              'scribeInfo',
              JSON.stringify({ jobName: data.job_name })
            );
            this.router.navigateByUrl('scribe-info');
            this.loader = false;
          })
          .catch((error: any) => {
            this.loader = false;
            console.log('error', error);
          });
      })
      .catch((error: any) => {
        this.loader = false;
        console.log('error', error);
      });
  }

  navigateBack() {
    this.location.back();
  }

  resume() {
    this.isRecordingPaused = false;
    this.vSearch.start();
    this.audioScribeService.resumeRecording();
  }

  pause() {
    this.isRecordingPaused = true;
    this.vSearch.stop();
    this.audioScribeService.pauseRecording();
  }
}
