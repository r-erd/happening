import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VotingtickerComponent } from './votingticker.component';

describe('VotingtickerComponent', () => {
  let component: VotingtickerComponent;
  let fixture: ComponentFixture<VotingtickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VotingtickerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VotingtickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
