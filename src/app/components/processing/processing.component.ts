import { Component, OnInit, ElementRef } from '@angular/core';
import SiriWave from "siriwave";

@Component({
  selector: 'app-processing',
  templateUrl: './processing.component.html',
  styleUrls: ['./processing.component.scss']
})
export class ProcessingComponent implements OnInit {

  private siriWave!: SiriWave;

  constructor(private elementRef: ElementRef) { }

  ngOnInit(): void {
    const siriContainer = this.elementRef.nativeElement.querySelector('#siri-container');
    
    // Ensure the container exists before creating the SiriWave instance
    if (siriContainer) {
      this.createSiriWave(siriContainer);
    } else {
      console.error("Siri container not found.");
    }
  }

  private createSiriWave(container: HTMLElement): void {
    this.siriWave = new SiriWave({
      container: container,
      autostart: true // You can configure other options here
    });
  }
}
