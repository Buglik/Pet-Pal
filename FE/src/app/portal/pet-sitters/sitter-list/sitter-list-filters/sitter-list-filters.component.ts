import {Component, OnDestroy} from '@angular/core';
import {Store} from "@ngrx/store";
import {AppState} from "../../../../state/app.state";
import {selectSittersListFilterParams} from "../../../../state/sitters/sitters.selectors";
import {map} from "rxjs/operators";
import {Subscription} from "rxjs";
import {EnumService, SelectOption} from "../../../../utils/enum.service";
import {PetExperienceEnum} from "../../../../../api/src";
import {changeFiltersSitterList, SitterListFilters} from "../../../../state/sitters/sitters.actions";

@Component({
  selector: 'app-sitter-list-filters',
  templateUrl: './sitter-list-filters.component.html',
  styleUrls: ['./sitter-list-filters.component.scss']
})
export class SitterListFiltersComponent implements OnDestroy {

  petOptions: SelectOption<string>[] = this.enumService.getPetsSelectOptions();

  address: string | null;
  startDate: Date | null;
  endDate: Date | null;
  pets: Array<PetExperienceEnum> | null;

  private subSink = new Subscription();

  constructor(private store: Store<AppState>, private readonly enumService: EnumService) {
    this.subSink.add(
      this.store.select(selectSittersListFilterParams)
        .pipe(map(item => item.address)).subscribe(next => this.address = next)
    )
    this.subSink.add(
      this.store.select(selectSittersListFilterParams)
        .pipe(map(item => item.period)).subscribe(next => {
        this.startDate = next?.startDate || null;
        this.endDate = next?.endDate || null;
      }),
    )
    this.subSink.add(
      this.store.select(selectSittersListFilterParams)
        .pipe(map(item => item.pets)).subscribe(next => this.pets = next))
  }

  ngOnDestroy() {
    this.subSink.unsubscribe();
  }


  updateFilters() {
    const newFilter: SitterListFilters = {
      address: this.address,
      period: this.startDate && this.endDate ? {
        startDate: this.startDate,
        endDate: this.endDate
      } : null,
      pets: this.pets || null
    }
    this.store.dispatch(changeFiltersSitterList(newFilter))
  }

}
