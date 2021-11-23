import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatPaginatorIntl, PageEvent} from "@angular/material/paginator";
import {PaginatorTranslations} from "./paginatorTranslations";
import {TablePaginationParams} from "../../state/sitters/sitters.actions";

@Component({
  selector: 'app-pagination-switch',
  templateUrl: './pagination-switch.component.html',
  styleUrls: ['./pagination-switch.component.scss'],
  providers: [{
    provide: MatPaginatorIntl,
    useClass: PaginatorTranslations
  }]
})
export class PaginationSwitchComponent {

  @Input() paginationParams: TablePaginationParams;
  @Output() paginationChanged = new EventEmitter<TablePaginationParams>();

  changePagination(pageParams: PageEvent) {
    const newParams: TablePaginationParams = {
      ...this.paginationParams,
      pagination: pageParams.pageSize,
      pageNumber: pageParams.pageIndex,
    }
    this.paginationChanged.emit(newParams)
  }

}
