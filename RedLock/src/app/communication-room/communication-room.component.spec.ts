import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunicationRoomComponent } from './communication-room.component';

describe('CommunicationRoomComponent', () => {
  let component: CommunicationRoomComponent;
  let fixture: ComponentFixture<CommunicationRoomComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommunicationRoomComponent]
    });
    fixture = TestBed.createComponent(CommunicationRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
