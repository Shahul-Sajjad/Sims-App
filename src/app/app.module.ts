import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SimsCoreService } from './services/sims-core.service';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { InvoiceSummaryComponent } from './components/invoice-summary/invoice-summary.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartModule } from 'angular2-chartjs';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { DxChartModule, DxTooltipModule, DxTreeMapModule, DxPieChartModule } from 'devextreme-angular';
import { InvoiceDetailsComponent } from './components/invoice-details/invoice-details.component';
import { MawContainerComponent } from './components/maw-container/maw-container.component';
import { MawQuicklinknavComponent } from './components/maw-container/maw-quicklinknav/maw-quicklinknav.component';
import { MawChartComponent } from './components/maw-container/maw-chart/maw-chart.component';
import { HomeComponent } from './components/home/home.component';
import { MawSidenavComponent } from './components/maw-sidenav/maw-sidenav.component';
import { MaterialModule } from './material.module';
import { InboxComponent } from './components/inbox/inbox.component';
import { InvoiceInfoDetailsComponent } from './components/invoice-info-details/invoice-info-details.component';
import { FooterComponent } from './components/footer/footer.component';
import { CommonService } from './services/common.service';
import { SimsHttpCoreServices } from './services/sims-http-core.service';
import { FeatureModule } from './modules/feature-module/feature.module';
import { TestFeatureComponent } from './components/test-feature-component/test-feature-component.component';
import { InboxPipe } from './pipes/inbox.pipe';
import { InvoiceHeaderComponent } from './components/invoice-header/invoice-header.component';
import { InvoiceDetailTabComponent } from './components/invoice-detail-tab/invoice-detail-tab.component';
import { InvoiceBankDetailTabComponent } from './components/invoice-bank-detail-tab/invoice-bank-detail-tab.component';
import { VendorBankDetailTabComponent } from './components/vendor-bank-detail-tab/vendor-bank-detail-tab.component';
import { TaxFreightDetailTabComponent } from './components/tax-freight-detail-tab/tax-freight-detail-tab.component';
import { UploadDetailTabComponent } from './components/upload-detail-tab/upload-detail-tab.component';
import { InvoiceThreeWayMatchingComponent } from './components/invoice-three-way-matching/invoice-three-way-matching.component';
import { InvoiceCommentTabComponent } from './components/invoice-comment-tab/invoice-comment-tab.component';
import { InvoiceActionsComponent } from './components/invoice-actions/invoice-actions.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { LogInComponent } from './components/log-in/log-in.component';

import { EditUserBasicInfoComponent } from './components/edit-user-basic-info/edit-user-basic-info.component';
import { EditUserContactInfoComponent } from './components/edit-user-contact-info/edit-user-contact-info.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { PoLineDetailsDialogComponent } from './components/po-line-details-dialog/po-line-details-dialog.component';
import { PostToErpDialogComponent } from './components/post-to-erp-dialog/post-to-erp-dialog.component';
import { PdfExpandViewerDialogComponent } from './components/pdf-expand-viewer-dialog/pdf-expand-viewer-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    MawSidenavComponent,
    InvoiceDetailsComponent,
    MawContainerComponent,
    MawQuicklinknavComponent,
    MawChartComponent,
    HomeComponent,
    InboxComponent,
    InboxPipe,
    InvoiceInfoDetailsComponent,
    InvoiceSummaryComponent,
    FooterComponent,
    TestFeatureComponent,
    InvoiceHeaderComponent,
    InvoiceDetailTabComponent,
    InvoiceBankDetailTabComponent,
    VendorBankDetailTabComponent,
    TaxFreightDetailTabComponent,
    UploadDetailTabComponent,
    InvoiceThreeWayMatchingComponent,
    InvoiceCommentTabComponent,
    InvoiceActionsComponent,
    LogInComponent,
    UserProfileComponent,
    EditUserBasicInfoComponent,
    EditUserContactInfoComponent,
    PoLineDetailsDialogComponent,
    PostToErpDialogComponent,
    PdfExpandViewerDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChartModule,
    PdfViewerModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    MaterialModule,
    DxChartModule,
    DxTreeMapModule,
    DxTooltipModule,
    DxPieChartModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FeatureModule,
    MatSnackBarModule
  ],
  providers: [SimsCoreService,
    CookieService,
    CommonService,
    SimsHttpCoreServices],
  entryComponents: [
    EditUserBasicInfoComponent,
    EditUserContactInfoComponent,
    PoLineDetailsDialogComponent,
    PostToErpDialogComponent,
    PdfExpandViewerDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
