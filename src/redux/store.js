import { configureStore } from '@reduxjs/toolkit';
import UserReducer from './features/userSlice';
import { AuthApi } from './api/AuthApi';
import { UserListApi } from './api/UserListApi';
import { TransactionsApi } from './api/TransactionsApi';
import { ReviewsApi } from './api/ReviewsApi';
import { DevicesApi } from './api/DevicesApi';
import { DashboardApi } from './api/DashboardApi';
import { HomeApi } from './api/HomeApi';
import { CategoriesApi } from './api/CategoriesApi';
import { RepairServiceApi } from './api/Repair&ServiceApi';
import { RentalApi } from './api/RentalApi';
import { RentApi } from './api/RentApi';
import { GeneralApi } from './api/GeneralApi';
import { CredentialsApi } from './api/CredentialsApi';
import { OrdersApi } from './api/OrdersApi';
import { QuotesApi } from './api/QuotesApi';
import { ProductreviewApi } from './api/ProductreviewApi';
import { RentalOrderDetailsApi } from './api/RentalOrderDetailsApi';
import { RefurbishedApi } from './api/RefurbishedApi';
import { RoleAccessApi } from './api/RoleAccessApi';
import { UserCreationApi } from './api/UserCreationApi';
import { EmployeeRoleApi } from './api/EmployeeRoleApi';
import { AccessApi } from './api/AccessApi';
import { RefurbishUserApi } from './api/RefurbishUserApi';
import { ProfileOrdersApi } from './api/ProfileOrdersApi';
import { LogoApi } from './api/LogoApi';
import { CouponApi } from './api/CouponApi';
import { GalleryApi } from './api/GalleryApi';
import { NotificationAPi } from './api/NotificationApi';
import { UserCartApi } from './api/UserCartApi';
import { IssueApi } from './api/IssueApi';
import { MostBookedServiceApi } from './api/MostBookedServiceApi';
import { SupportApi } from './api/SupportApi';
import { QuotesDetailsApi } from './api/QuotesDetailsApi';
import { EmailApi } from './api/EmailApi';
import { PriceChartAPi } from './api/PriceChartApi';
import { FaqAPi } from './api/FaqApi';
import { AboutUsApi } from './api/AboutUs';
import { PriceComparisonsApi } from './api/PriceComparisonApi';
import { PriceComparisonApi } from './api/AdminPriceComparisonApi';
import { EmailTemplateApi } from './api/EmailTemplateApi';
import { BillInformationApi } from './api/BillInformationApi';
import { CustomLaptopRequestsApi } from './api/CustomLaptopRequestsApi';
import { PreviewApi } from './api/PreviewApi';
import { ServiceAreaApi } from './api/ServiceAreaApi';


export const store = configureStore({
  reducer: {
    User: UserReducer,
    [AuthApi.reducerPath]: AuthApi.reducer,
    [UserListApi.reducerPath]: UserListApi.reducer,
    [TransactionsApi.reducerPath]: TransactionsApi.reducer,
    [ReviewsApi.reducerPath]: ReviewsApi.reducer,
    [DevicesApi.reducerPath]: DevicesApi.reducer,
    [DashboardApi.reducerPath]: DashboardApi.reducer,
    [HomeApi.reducerPath]: HomeApi.reducer,
    [CategoriesApi.reducerPath]: CategoriesApi.reducer,
    [RepairServiceApi.reducerPath]: RepairServiceApi.reducer,
    [RentalApi.reducerPath]: RentalApi.reducer,
    [RentApi.reducerPath]: RentApi.reducer,
    [GeneralApi.reducerPath]: GeneralApi.reducer,
    [CredentialsApi.reducerPath]: CredentialsApi.reducer,
    [OrdersApi.reducerPath]: OrdersApi.reducer,
    [QuotesApi.reducerPath]: QuotesApi.reducer,
    [ProductreviewApi.reducerPath]: ProductreviewApi.reducer,
    [RentalOrderDetailsApi.reducerPath]: RentalOrderDetailsApi.reducer,
    [RefurbishedApi.reducerPath]: RefurbishedApi.reducer,
    [RoleAccessApi.reducerPath]: RoleAccessApi.reducer,
    [UserCreationApi.reducerPath]: UserCreationApi.reducer,
    [EmployeeRoleApi.reducerPath]: EmployeeRoleApi.reducer,
    [AccessApi.reducerPath]: AccessApi.reducer,
    [RefurbishUserApi.reducerPath]: RefurbishUserApi.reducer,
    [ProfileOrdersApi.reducerPath]: ProfileOrdersApi.reducer,
    [LogoApi.reducerPath]: LogoApi.reducer,
    [CouponApi.reducerPath]: CouponApi.reducer,
    [GalleryApi.reducerPath]: GalleryApi.reducer,
    [NotificationAPi.reducerPath]: NotificationAPi.reducer,
    [UserCartApi.reducerPath]: UserCartApi.reducer,
    [IssueApi.reducerPath]: IssueApi.reducer,
    [MostBookedServiceApi.reducerPath]: MostBookedServiceApi.reducer,
    [SupportApi.reducerPath]: SupportApi.reducer,
    [QuotesDetailsApi.reducerPath]: QuotesDetailsApi.reducer,
    [EmailApi.reducerPath]: EmailApi.reducer,
    [PriceChartAPi.reducerPath]: PriceChartAPi.reducer,
    [FaqAPi.reducerPath]: FaqAPi.reducer,
    [AboutUsApi.reducerPath]: AboutUsApi.reducer,
    [PriceComparisonApi.reducerPath]:PriceComparisonApi.reducer,
    [EmailTemplateApi.reducerPath]:EmailTemplateApi.reducer,
    [PriceComparisonsApi.reducerPath]:PriceComparisonsApi.reducer,
    [BillInformationApi.reducerPath]:BillInformationApi.reducer,
    [CustomLaptopRequestsApi.reducerPath]:CustomLaptopRequestsApi.reducer,
    [PreviewApi.reducerPath]:PreviewApi.reducer,
    [ServiceAreaApi.reducerPath]:ServiceAreaApi.reducer,

  },
  devTools: process.env.NODE_ENV === 'development',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      // AuthApi.middleware
      AuthApi.middleware,
      UserListApi.middleware,
      TransactionsApi.middleware,
      ReviewsApi.middleware,
      DevicesApi.middleware,
      DashboardApi.middleware,
      HomeApi.middleware,
      CategoriesApi.middleware,
      RepairServiceApi.middleware,
      RentalApi.middleware,
      RentApi.middleware,
      GeneralApi.middleware,
      CredentialsApi.middleware,
      OrdersApi.middleware,
      QuotesApi.middleware,
      ProductreviewApi.middleware,
      RentalOrderDetailsApi.middleware,
      RefurbishedApi.middleware,
      RoleAccessApi.middleware,
      UserCreationApi.middleware,
      EmployeeRoleApi.middleware,
      AccessApi.middleware,
      RefurbishUserApi.middleware,
      ProfileOrdersApi.middleware,
      LogoApi.middleware,
      CouponApi.middleware,
      GalleryApi.middleware,
      NotificationAPi.middleware,
      UserCartApi.middleware,
      IssueApi.middleware,
      MostBookedServiceApi.middleware,
      SupportApi.middleware,
      QuotesDetailsApi.middleware,
      EmailApi.middleware,
      PriceChartAPi.middleware,
      FaqAPi.middleware,
      AboutUsApi.middleware,
      PriceComparisonApi.middleware,
      EmailTemplateApi.middleware,
      PriceComparisonsApi.middleware,
      BillInformationApi.middleware,
      CustomLaptopRequestsApi.middleware,
      PreviewApi.middleware,
      ServiceAreaApi.middleware,


    ]),
});
