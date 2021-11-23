import {MatPaginatorIntl} from "@angular/material/paginator";
import {TranslateService} from "@ngx-translate/core";
import {Injectable} from "@angular/core";

@Injectable()
export class PaginatorTranslations extends MatPaginatorIntl {

  private rangeLabelIntl: string;

  constructor(private translateService: TranslateService) {
    super();

    this.translateService.onLangChange.subscribe((_event: Event) => {
      this.getTranslations();
    });

    this.getTranslations();
  }

  getTranslations() {
    this.translateService.get([
      'paginator.itemsPerPage',
      'paginator.nextPage',
      'paginator.previousPage',
      'paginator.rangeLabel',
      'paginator.firstPage',
      'paginator.lastPage',
    ])
      .subscribe(translation => {
        this.itemsPerPageLabel = translation['paginator.itemsPerPage'] + ':';
        this.nextPageLabel = translation['paginator.nextPage'];
        this.previousPageLabel = translation['paginator.previousPage'];
        this.rangeLabelIntl = translation['paginator.rangeLabel'];
        this.firstPageLabel = translation['paginator.firstPage'];
        this.lastPageLabel = translation['paginator.lastPage'];

        this.changes.next();
      });
  }

  getRangeLabel = (page: number, pageSize: number, length: number) => {
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex = startIndex < length ?
      Math.min(startIndex + pageSize, length) :
      startIndex + pageSize;
    return startIndex + 1 + " - " + endIndex + " " + this.rangeLabelIntl + " " + length;
  };

}
