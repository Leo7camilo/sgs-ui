import { Component, Input, OnInit } from '@angular/core';
@Component({
  selector: 'status-component',
  template: `<a href="#" onclick="javascript:onCustom()"><i class="nb-plus"></i></a>`
})
export class NgxStatusComponent implements OnInit {
  @Input() value;
  name;
  constructor() { }
  ngOnInit() {
    this.name = this.value.name
  }
}
