import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleMetaDataComponent } from './article-meta-data.component';

describe('ArticleMetaDataComponent', () => {
  let component: ArticleMetaDataComponent;
  let fixture: ComponentFixture<ArticleMetaDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleMetaDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleMetaDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
