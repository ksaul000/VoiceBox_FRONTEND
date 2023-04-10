import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WriteQuestComponent } from './write-quest.component';

describe('WriteQuestComponent', () => {
  let component: WriteQuestComponent;
  let fixture: ComponentFixture<WriteQuestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WriteQuestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WriteQuestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
