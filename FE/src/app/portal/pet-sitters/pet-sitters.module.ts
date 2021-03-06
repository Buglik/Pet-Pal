import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PetSittersComponent} from "./pet-sitters.component";
import {PetSittersRoutingModule} from "./pet-sitters-routing.module";
import {BecomePetsitterComponent} from './become-petsitter/become-petsitter.component';
import {MatStepperModule} from "@angular/material/stepper";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {TranslateModule} from "@ngx-translate/core";
import {ExperienceFormComponent} from './become-petsitter/experience-form/experience-form.component';
import {UtilsModule} from "../../utils/utils.module";
import {MatChipsModule} from "@angular/material/chips";
import {AvailabilityFormComponent} from "./become-petsitter/availability-form/availability-form.component";
import {LocaleService, NgxDaterangepickerMd} from "ngx-daterangepicker-material";
import {StepperSummaryComponent} from './become-petsitter/stepper-summary/stepper-summary.component';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {SitterPageComponent} from './sitter-page/sitter-page.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {SitterProfileInfoCardComponent} from './sitter-page/sitter-profile-info-card/sitter-profile-info-card.component';
import {SitterInfoComponent} from './sitter-page/sitter-info/sitter-info.component';
import {PipesModule} from "../../pipes/pipes.module";
import {MatDividerModule} from "@angular/material/divider";
import {PortalModule} from "../portal.module";
import {SitterSectionComponent} from './sitter-page/sitter-info/sitter-section/sitter-section.component';
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";
import {SittersEffects} from "../../state/sitters/sitters.effects";
import {sitterListFeature, sitterReviewsFeature} from "../../state/app.state";
import {sittersReducer} from "../../state/sitters/sitters.reducer";
import {SitterListComponent} from './sitter-list/sitter-list.component';
import {SitterListItemComponent} from './sitter-list/sitter-list-item/sitter-list-item.component';
import {BarRatingModule} from "ngx-bar-rating";
import {ReviewsEffects} from "../../state/reviews/reviews.effects";
import {reviewsReducer} from "../../state/reviews/reviews.reducer";
import {ReviewCardComponent} from './sitter-page/sitter-info/review-card/review-card.component';
import {ReviewFormComponent} from './sitter-page/review-form/review-form.component';
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {ReviewService} from "./review.service";
import {BannerModule} from "../../utils/banner/banner.module";
import {SitterListFiltersComponent} from './sitter-list/sitter-list-filters/sitter-list-filters.component';
import {MatSelectModule} from "@angular/material/select";


@NgModule({
  declarations: [
    PetSittersComponent,
    BecomePetsitterComponent,
    ExperienceFormComponent,
    AvailabilityFormComponent,
    StepperSummaryComponent,
    SitterPageComponent,
    SitterProfileInfoCardComponent,
    SitterInfoComponent,
    SitterSectionComponent,
    SitterListComponent,
    SitterListItemComponent,
    ReviewCardComponent,
    ReviewFormComponent,
    SitterListFiltersComponent,
  ],
    imports: [
        CommonModule,
        PetSittersRoutingModule,
        MatStepperModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        TranslateModule,
        UtilsModule,
        MatChipsModule,
        NgxDaterangepickerMd.forRoot(),
        MatDatepickerModule,
        MatNativeDateModule,
        MatProgressSpinnerModule,
        PipesModule,
        MatDividerModule,
        PortalModule,
        StoreDevtoolsModule.instrument({
            maxAge: 25, // Retains last 25 states
        }),
        StoreModule.forFeature(sitterListFeature, sittersReducer),
        StoreModule.forFeature(sitterReviewsFeature, reviewsReducer),
        EffectsModule.forFeature([SittersEffects, ReviewsEffects]),
        BarRatingModule,
        MatDialogModule,
        FormsModule,
        BannerModule,
        MatSelectModule
    ],
  providers: [
    LocaleService,
    MatDialog,
    ReviewService
  ],
  exports: [PetSittersComponent, SitterSectionComponent, ReviewCardComponent]
})
export class PetSittersModule {
}
