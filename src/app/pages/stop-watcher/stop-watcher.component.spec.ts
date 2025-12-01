import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StopWatcherComponent } from './stop-watcher.component';

describe('StopWatcherComponent', () => {
  let component: StopWatcherComponent;
  let fixture: ComponentFixture<StopWatcherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StopWatcherComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StopWatcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
