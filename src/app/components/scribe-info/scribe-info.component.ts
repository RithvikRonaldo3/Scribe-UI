import { Location } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AudioScribeService } from 'src/app/services/audio-scribe.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-scribe-info',
  templateUrl: './scribe-info.component.html',
  styleUrls: ['./scribe-info.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ScribeInfoComponent implements OnInit {
  transcript: any;
  summary: any;
  loader: boolean = false;
  transcriptState: string;
  selectedIndex = 1;
  scribeInfo: any;
  isSummaryActive: boolean = false;

  constructor(
    private http: HttpService,
    private location: Location
  ) {}

  async ngOnInit() {
    this.loader = true;
    this.scribeInfo = JSON.parse(localStorage.getItem('scribeInfo'));
    await this.http
      .getTranscribeJob({ job_name: this.scribeInfo?.jobName })
      .toPromise()
      .then(async (data: any) => {
        const status = data['MedicalScribeJob']['MedicalScribeJobStatus'];
        this.transcriptState = status;
        if (status === 'COMPLETED') {
          this.scribeInfo['transcript'] =
            data['MedicalScribeJob']['MedicalScribeOutput'][
              'TranscriptFileUri'
            ];
          this.scribeInfo['summary'] =
            data['MedicalScribeJob']['MedicalScribeOutput'][
              'ClinicalDocumentUri'
            ];
          await this.getTranscriptContent();
        } else {
          this.loader = false;
        }
      })
      .catch((error) => {
        this.loader = false;
        console.log('error', error);
      });
  }

  async getTranscriptContent() {
    const { transcript, summary } = this.scribeInfo;
    await this.http
      .getObjectContent({
        fileName: transcript.split('thrive-health-audio-files/')[1],
      })
      .toPromise()
      .then((data: any) => {
        const transcript = data['Conversation']['TranscriptSegments']?.map(
          (data) => data['Content']
        );
        this.transcript = transcript;
      });
    await this.http
      .getObjectContent({
        fileName: summary.split('thrive-health-audio-files/')[1],
      })
      .toPromise()
      .then((data: any) => {
        const sections = data['ClinicalDocumentation']['Sections'];
        this.summary = sections
          ?.map((section: any) => {
            const { SectionName, Summary } = section;
            const points = [];
            if (!Summary?.length) return null;
            Summary?.forEach((section: any) => {
              points.push(section['SummarizedSegment']);
            });
            return {
              title: SectionName.replace(/_/g, ' '),
              points,
            };
          })
          .filter(Boolean);
      });
    this.loader = false;
  }

  navigateBack() {
    this.location.back();
  }

  toggleSummary() {
    this.isSummaryActive = !this.isSummaryActive;
}

  ngOnDestroy() {
    localStorage.removeItem('scribeInfo');
  }

  copyContent() {
    let content = '';
    if (this.selectedIndex === 0) {
      content = this.transcript;
    } else {
      const summary = JSON.parse(JSON.stringify(this.summary));
      content = summary
        ?.map((section) => {
          const pointsFormatted = section.points
            .map((point) => `  • ${point.replace(/\n/g, '')}`)
            .join('\n');
          return `${section.title}\n${pointsFormatted}\n\n`;
        })
        .join('');
    }
    const element = document.createElement('textarea');
    document.body.appendChild(element);
    element.value = content;
    element.select();
    document.execCommand('copy');
    document.body.removeChild(element);
  }

  tabChange(value: number) {
    this.selectedIndex = value;
  }
}
