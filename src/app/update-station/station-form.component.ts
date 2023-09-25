import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/service/data.service';

@Component({
  selector: 'app-update-station',
  templateUrl: './station-form.component.html',
  styleUrls: ['./station-form.component.scss']
})


export class UpdateStateComponent implements OnInit {
  @Output() showInfo: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() refreshMarkers: EventEmitter<void> = new EventEmitter<void>();

  form: FormGroup;
  infoContent: any
  isDeleting = false;

  constructor(private dataService: DataService, private fb: FormBuilder) {

    this.form = this.fb.group({
      name: ['', Validators.required],
      temperature: ['', [Validators.required, Validators.pattern(/^-?\d+(\.\d{1,2})?$/)]],
      latitude: ['', [Validators.required, Validators.pattern(/^-?\d+(\.\d{1,2})?$/)]],
      longitude: ['', [Validators.required, Validators.pattern(/^-?\d+(\.\d{1,2})?$/)]]
    });

  }
  ngOnInit(): void {
    this.dataService.getContent().subscribe(data=>{
      this.infoContent = data
    })
    this.form.get('name')?.setValue(this.infoContent.title);
    this.form.get('temperature')?.setValue(this.infoContent.temperature);
    this.form.get('latitude')?.setValue(this.infoContent.position.lat);
    this.form.get('longitude')?.setValue(this.infoContent.position.lng);
  }


  onSubmit() {
    if (this.form.valid) {
    const newData = {
      ubication: this.form.value.name,
      temperature: this.form.value.temperature,
      latitude: this.form.value.latitude,
      longitude: this.form.value.longitude,
    }
    this.dataService.updateValidator(this.infoContent.id, newData).subscribe({
      next: (data: any) => {
        this.refreshMarkers.emit()
        window.alert('Se ha actualizado el marcador')
      }, error: (error: any) => {
        console.error(error);
      }
    })
  }else{
    this.form.markAllAsTouched();
  }
  }
  onCancel() {
    this.showInfo.emit(true);
  }

  onDelete() {
    this.isDeleting = true;

    this.dataService.deleteValidator(this.infoContent.id).subscribe({
      next: (data: any) => {
        this.refreshMarkers.emit()
        this.isDeleting = false;
        this.isDeleting = true;
      }, error: (error: any) => {
        console.error(error);
        this.isDeleting = false;
      }
    })
  }
};
