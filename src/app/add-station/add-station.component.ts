import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/service/data.service';

@Component({
  selector: 'app-add-station',
  templateUrl: './add-station.component.html',
  styleUrls: ['./add-station.component.scss']
})
export class AddStationComponent {
  
  @Output() showAddForm: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() refreshMarkers: EventEmitter<void> = new EventEmitter<void>();

  form: FormGroup;
  constructor(private dataService: DataService, private fb: FormBuilder) {

    this.form = this.fb.group({
      name: ['', Validators.required],
      temperature: ['', [Validators.required, Validators.pattern(/^-?\d+(\.\d{1,2})?$/)]],
      latitude: ['', [Validators.required, Validators.pattern(/^-?\d+(\.\d{1,2})?$/)]],
      longitude: ['', [Validators.required, Validators.pattern(/^-?\d+(\.\d{1,2})?$/)]]
    });

  }
  ngOnInit(): void {

  }


  onSubmit() {
    if (this.form.valid) {
    const newData = {
      ubication: this.form.value.name,
      temperature: this.form.value.temperature,
      latitude: this.form.value.latitude,
      longitude: this.form.value.longitude,
    }
    this.dataService.addValidator(newData).subscribe({
      next: (data: any) => {
        this.refreshMarkers.emit()
        window.alert('Se ha añadido un nuevo marcado')
      }, error: (error: any) => {
        console.error(error);
      }
    })
  }else{
    console.log(this.form)
  }
  }
  onCancel() {
    this.showAddForm.emit(true);
  }

}
