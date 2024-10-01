import { lazy, Suspense } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import Loader from '../components/Loader';
import GuestGuard from '../guards/GuestGuard';
import AuthGuard from '../guards/AuthGuard';
import HomeLayout from '../pages/Layout/HomeLayout';
import RentLayout from '../pages/Rent/RentLayout';
import RefurbishedLayout from '../pages/Refurbished/RefurbishedLayout';
import DashboardLayout from '../pages/Admin/Dashboard/DashboardLayout';
import RepairServiceLayout from '../pages/Repair&Service/RepairServiceLayout';

const Loadable = (Component) => (props) => {
  return (
    <Suspense fallback={<Loader />}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: '/',
      element: (
        <GuestGuard>
          <HomeLayout />
        </GuestGuard>
      ),
      children: [
        {
          path: '/',
          element: (
            <GuestGuard>
              <Home />
            </GuestGuard>
          ),
        },
        {
          path: '/rent',
          element: (
            <GuestGuard>
              <RentLayout />
            </GuestGuard>
          ),
          children: [
            {
              path: '/rent',
              element: (
                <GuestGuard>
                  <Rent />
                </GuestGuard>
              ),
            },
            {
              path: '/rent/rent-details',
              element: (
                <GuestGuard>
                  <RentDetails />
                </GuestGuard>
              ),
            },
          ],
        },
        {
          path: '/refurbished',
          element: (
            <GuestGuard>
              <RefurbishedLayout />
            </GuestGuard>
          ),
          children: [
            {
              path: '/refurbished',
              element: (
                <GuestGuard>
                  <Refurbished />
                </GuestGuard>
              ),
            },
            {
              path: '/refurbished/refurbished-details',
              element: (
                <GuestGuard>
                  <RefurbishedDetails />
                </GuestGuard>
              ),
            },
          ],
        },
        {
          path: '/repair-service',
          element: (
            <GuestGuard>
              <RepairServiceLayout />
            </GuestGuard>
          ),
          children: [
            {
              path: '/repair-service',
              element: (
                <GuestGuard>
                  <RepairService />
                </GuestGuard>
              ),
            },
          ],
        },
        {
          path: '/about-us',
          element: (
            <GuestGuard>
              <AboutUs />
            </GuestGuard>
          ),
        },
        {
          path: '/my-profile',
          element: (
            <GuestGuard>
              <Profile />
            </GuestGuard>
          ),
        },
        {
          path: '/contact-us',
          element: (
            <GuestGuard>
              <ContactUs />
            </GuestGuard>
          ),
        },
        {
          path: '/privacy-policy',
          element: (
            <GuestGuard>
              <PrivacyPolicy />
            </GuestGuard>
          ),
        },
        {
          path: '/faq',
          element: (
            <GuestGuard>
              <Faq />
            </GuestGuard>
          ),
        },
        {
          path: '/terms-conditions',
          element: (
            <GuestGuard>
              <TermsAndCondition />
            </GuestGuard>
          ),
        },
        {
          path: '/reviews',
          element: (
            <GuestGuard>
              <Reviews />
            </GuestGuard>
          ),
        },
        {
          path: '/invoice',
          element: (
            <GuestGuard>
              <Invoicepdf />
            </GuestGuard>
          ),
        },

        {
          path: '/razorpay',
          element: (
            <GuestGuard>
              <RazorPay />
            </GuestGuard>
          ),
        },
        {
          path: '/services',
          element: (
            <GuestGuard>
              <Services />
            </GuestGuard>
          ),
        },

        {
          path: '/disclaimer',
          element: (
            <GuestGuard>
              <Disclaimer />
            </GuestGuard>
          ),
        },
        {
          path: '/price-comparison',
          element: (
            <GuestGuard>
              <Priceandcomparison />
            </GuestGuard>
          ),
        },
        {
          path: '/price-chart',
          element: (
            <GuestGuard>
              <PriceChart />
            </GuestGuard>
          ),
        },

        {
          path: '/gallery',
          element: (
            <GuestGuard>
              <Gallery />
            </GuestGuard>
          ),
        },
      ],
    },

    {
      path: '/login',
      element: (
        <GuestGuard>
          <Login />
        </GuestGuard>
      ),
    },
    {
      path: 'admin',
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        {
          path: '/admin/user-list',
          element: (
            <AuthGuard>
              <UserList />
            </AuthGuard>
          ),
        },
        {
          path: '/admin/transactions',
          element: (
            <AuthGuard>
              <Transactions />
            </AuthGuard>
          ),
        },
        {
          path: '/admin/review',
          element: (
            <AuthGuard>
              <Review />
            </AuthGuard>
          ),
        },
        {
          path: '/admin/product-review',
          element: (
            <AuthGuard>
              <Productreview />
            </AuthGuard>
          ),
        },
        {
          path: '/admin/dashboard',
          element: (
            <AuthGuard>
              <Dashboard />
            </AuthGuard>
          ),
        },
        {
          path: '/admin/categories',
          element: (
            <AuthGuard>
              <Categories />
            </AuthGuard>
          ),
        },
        {
          path: '/admin/employee-reports',
          element: (
            <AuthGuard>
              <EmployeeReports />
            </AuthGuard>
          ),
        },
        {
          path: '/admin/order-reports',
          element: (
            <AuthGuard>
              <OrderReports />
            </AuthGuard>
          ),
        },
        {
          path: '/admin/user-reports',
          element: (
            <AuthGuard>
              <UserReports />
            </AuthGuard>
          ),
        },
        {
          path: '/admin/rental-product',
          element: (
            <AuthGuard>
              <RentalProductReports />
            </AuthGuard>
          ),
        },
        {
          path: '/admin/refurbished-product',
          element: (
            <AuthGuard>
              <RefurbishedProductReports />
            </AuthGuard>
          ),
        },
        {
          path: '/admin/employee',
          element: (
            <AuthGuard>
              <UserCreation />
            </AuthGuard>
          ),
        },
        {
          path: '/admin/add-employee',
          element: (
            <AuthGuard>
              <AddUserCreation />
            </AuthGuard>
          ),
        },
        {
          path: '/admin/edit-employee/:id',
          element: (
            <AuthGuard>
              <EditUserCreation />
            </AuthGuard>
          ),
        },
        {
          path: '/admin/employee-roles',
          element: (
            <AuthGuard>
              <EmployeeRoles />
            </AuthGuard>
          ),
        },

        {
          path: '/admin/role-access',
          element: (
            <AuthGuard>
              <RoleAcess />
            </AuthGuard>
          ),
        },
        {
          path: '/admin/repair-service',
          element: (
            <AuthGuard>
              <AdminRepairService />
            </AuthGuard>
          ),
        },
        {
          path: '/admin/rental',
          element: (
            <AuthGuard>
              <Rental />
            </AuthGuard>
          ),
        },
        {
          path: '/admin/add-rental',
          element: (
            <AuthGuard>
              <AddRental />
            </AuthGuard>
          ),
        },
        {
          path: '/admin/edit-rental/:id',
          element: (
            <AuthGuard>
              <EditRental />
            </AuthGuard>
          ),
        },
        {
          path: '/admin/credentials',
          element: (
            <AuthGuard>
              <Credentials />
            </AuthGuard>
          ),
        },
        {
          path: '/admin/general',
          element: (
            <AuthGuard>
              <General />
            </AuthGuard>
          ),
        },
        {
          path: '/admin/price-chart',
          element: (
            <AuthGuard>
              <PriceCharts />
            </AuthGuard>
          ),
        },
        {
          path: '/admin/orders',
          element: (
            <AuthGuard>
              <Orders />
            </AuthGuard>
          ),
        },
        {
          path: '/admin/edit-order/:id',
          element: (
            <AuthGuard>
              <EditOrder />
            </AuthGuard>
          ),
        },

        {
          path: '/admin/quotes',
          element: (
            <AuthGuard>
              <Quotes />
            </AuthGuard>
          ),
        },
        {
          path: '/admin/refurbished-laptop',
          element: (
            <AuthGuard>
              <RefurbishedLaptop />
            </AuthGuard>
          ),
        },
        {
          path: '/admin/add-refurbished',
          element: (
            <AuthGuard>
              <AddRefurbishedLaptop />
            </AuthGuard>
          ),
        },
        {
          path: '/admin/edit-refurbished/:id',
          element: (
            <AuthGuard>
              <EditRefurbishedLaptop />
            </AuthGuard>
          ),
        },
        {
          path: '/admin/coupon',
          element: (
            <AuthGuard>
              <Coupon />
            </AuthGuard>
          ),
        },
        {
          path: '/admin/add-coupon',
          element: (
            <AuthGuard>
              <AddCoupon />
            </AuthGuard>
          ),
        },
        {
          path: '/admin/edit-coupon/:id',
          element: (
            <AuthGuard>
              <EditCoupon />
            </AuthGuard>
          ),
        },
        {
          path: '/admin/gallery-setting',
          element: (
            <AuthGuard>
              <GallerySetting />
            </AuthGuard>
          ),
        },
        {
          path: '/admin/notification',
          element: (
            <AuthGuard>
              <Notification />
            </AuthGuard>
          ),
        },

        {
          path: '/admin/add-gallery',
          element: (
            <AuthGuard>
              <AddGallery />
            </AuthGuard>
          ),
        },
        {
          path: '/admin/devices',
          element: (
            <AuthGuard>
              <Devices />
            </AuthGuard>
          ),
        },
        {
          path: '/admin/issues/:deviceName',
          element: (
            <AuthGuard>
              <Issues />
            </AuthGuard>
          ),
        },
        {
          path: '/admin/most-bookedservice',
          element: (
            <AuthGuard>
              <MostBookedService />
            </AuthGuard>
          ),
        },
        {
          path: '/admin/support',
          element: (
            <AuthGuard>
              <Support />
            </AuthGuard>
          ),
        },
        {
          path: '/admin/quotes-details/:requestId',
          element: (
            <AuthGuard>
              <QuotesDetails />
            </AuthGuard>
          ),
        },
        {
          path: '/admin/rentalOrder-details/:requestId',

          element: (
            <AuthGuard>
              <RentalOrderDetails />
            </AuthGuard>
          ),
        },
        {
          path: '/admin/repairOrder-details/:requestId',

          element: (
            <AuthGuard>
              <RepairOrderDetails />
            </AuthGuard>
          ),
        },
        {
          path: '/admin/refurbishedOrder-details/:requestId',

          element: (
            <AuthGuard>
              <RefurbishedOrderDetails />
            </AuthGuard>
          ),
        },
        {
          path: '/admin/transaction-id/:requestId',

          element: (
            <AuthGuard>
              <TransactionID />
            </AuthGuard>
          ),
        },
        {
          path: '/admin/email',

          element: (
            <AuthGuard>
              <Email />
            </AuthGuard>
          ),
        },
        {
          path: '/admin/faq',

          element: (
            <AuthGuard>
              <AdminFaq />
            </AuthGuard>
          ),
        },
        {
          path: '/admin/about-us',

          element: (
            <AuthGuard>
              <AdminAboutUs />
            </AuthGuard>
          ),
        },
        {
          path: '/admin/price-comparison',

          element: (
            <AuthGuard>
              <PriceComparison />
            </AuthGuard>
          ),
        },
        {
          path: '/admin/email-template',

          element: (
            <AuthGuard>
              <EmailTemplate />
            </AuthGuard>
          ),
        },
        {
          path: '/admin/bill-information/:id',

          element: (
            <AuthGuard>
              <BillInformation />
            </AuthGuard>
          ),
        },
        {
          path: '/admin/customlaptop-requests',

          element: (
            <AuthGuard>
              <CustomLaptopRequests />
            </AuthGuard>
          ),
        },

        {
          path: '/admin/preview/:requestId',

          element: (
            <AuthGuard>
              <Preview />
            </AuthGuard>
          ),
        },

        {
          path: '/admin/invoice/:requestId',

          element: (
            <AuthGuard>
              <Invoice />
            </AuthGuard>
          ),
        },

        {
          path: '/admin/request-details/:supportId',

          element: (
            <AuthGuard>
              <RequestDetails />
            </AuthGuard>
          ),
        },
        {
          path: '/admin/service-area',

          element: (
            <AuthGuard>
              <ServiceArea />
            </AuthGuard>
          ),
        },
      ],
    },
    {
      path: '*',
      children: [
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" replace /> },
      ],
    },
  ]);
}

const Home = Loadable(
  lazy(() => import('../pages/LandingSections/LandingSections'))
);
const Invoicepdf = Loadable(lazy(() => import('../pages/Invoice/Invoicepdf')));
const NotFound = Loadable(lazy(() => import('../pages/404/Page404')));
const Rent = Loadable(lazy(() => import('../pages/Rent/Rent')));
const Profile = Loadable(lazy(() => import('../pages/Profile/Profile')));
const Reviews = Loadable(lazy(() => import('../pages/Review/FooterReview')));
const Services = Loadable(
  lazy(() => import('../pages/LaptopService/LaptopService'))
);
const TermsAndCondition = Loadable(
  lazy(() => import('../pages/T&C/TermsAndCondition'))
);
const PrivacyPolicy = Loadable(
  lazy(() => import('../pages/PrivacyPolicy/PrivacyPolicy'))
);
const AboutUs = Loadable(lazy(() => import('../pages/AboutUs/AboutUs')));
const Faq = Loadable(lazy(() => import('../pages/Faq/Faq')));
const RepairService = Loadable(
  lazy(() => import('../pages/Repair&Service/RepairService'))
);
const ContactUs = Loadable(lazy(() => import('../pages/ContactUs/ContactUs')));
const Refurbished = Loadable(
  lazy(() => import('../pages/Refurbished/Refurbished'))
);
const RentDetails = Loadable(lazy(() => import('../pages/Rent/RentDetails')));
const RefurbishedDetails = Loadable(
  lazy(() => import('../pages/Refurbished/RefurbishedDetails'))
);
const Disclaimer = Loadable(
  lazy(() => import('../pages/Disclaimer/Disclaimer'))
);
const Gallery = Loadable(lazy(() => import('../pages/Gallery/Gallery')));
const Priceandcomparison = Loadable(
  lazy(() => import('../pages/Priceandcomparison/PriceandComparison'))
);
const PriceChart = Loadable(
  lazy(() => import('../pages/PriceChart/PriceChart'))
);
const RazorPay = Loadable(lazy(() => import('../components/RazorPay')));

/* Admin routes */

const Login = Loadable(lazy(() => import('../pages/Admin/LoginForms/Login')));
const UserList = Loadable(
  lazy(() => import('../pages/Admin/UserList/UserList'))
);
const Transactions = Loadable(
  lazy(() => import('../pages/Admin/Transactions/Transactions'))
);
const Review = Loadable(lazy(() => import('../pages/Admin/Reviewss/Reviews')));

const EmployeeReports = Loadable(
  lazy(() => import('../pages/Admin/Reports/EmployeeReports'))
);
const OrderReports = Loadable(
  lazy(() => import('../pages/Admin/Reports/OrderReports'))
);
const UserReports = Loadable(
  lazy(() => import('../pages/Admin/Reports/UserReports'))
);
const RentalProductReports = Loadable(
  lazy(() => import('../pages/Admin/Reports/RentalProductReports'))
);
const RefurbishedProductReports = Loadable(
  lazy(() => import('../pages/Admin/Reports/RefurbishedProductReports'))
);
const PriceCharts = Loadable(
  lazy(() => import('../pages/Admin/PriceChart/PriceChart'))
);

const Notification = Loadable(
  lazy(() => import('../pages/Admin/Notification/Notification'))
);
const Devices = Loadable(lazy(() => import('../pages/Admin/Devices/Devices')));
const Dashboard = Loadable(
  lazy(() => import('../pages/Admin/Dashboard/Dashboard'))
);
const AdminRepairService = Loadable(
  lazy(() => import('../pages/Admin//Repair&Service/Repair&Service'))
);
const Categories = Loadable(
  lazy(() => import('../pages/Admin/Categories/Categories'))
);
const RoleAcess = Loadable(
  lazy(() => import('../pages/Admin/RoleBased/roleBasedAcess'))
);
const EmployeeRoles = Loadable(
  lazy(() => import('../pages/Admin/EmployeeRoles/EmployeeRoles'))
);
const UserCreation = Loadable(
  lazy(() => import('../pages/Admin/Employees/Employee'))
);
const AddUserCreation = Loadable(
  lazy(() => import('../pages/Admin/Employees/AddEmployee'))
);
const EditUserCreation = Loadable(
  lazy(() => import('../pages/Admin/Employees/EditEmployee'))
);

const Rental = Loadable(lazy(() => import('../pages/Admin/Rental/Rental')));
const AddRental = Loadable(
  lazy(() => import('../pages/Admin/Rental/AddRental'))
);
const EditRental = Loadable(
  lazy(() => import('../pages/Admin/Rental/EditRental'))
);

const RefurbishedLaptop = Loadable(
  lazy(() => import('../pages/Admin/Refurbished/Refurbished'))
);

const AddRefurbishedLaptop = Loadable(
  lazy(() => import('../pages/Admin/Refurbished/AddRefurbished'))
);

const EditRefurbishedLaptop = Loadable(
  lazy(() => import('../pages/Admin/Refurbished/EditRefurbished'))
);

const Credentials = Loadable(
  lazy(() => import('../pages/Admin/Settingss/Credentials'))
);
const General = Loadable(
  lazy(() => import('../pages/Admin/Settingss/General'))
);
const Orders = Loadable(lazy(() => import('../pages/Admin/Orders/Orders')));
const EditOrder = Loadable(
  lazy(() => import('../pages/Admin/Orders/EditOrder'))
);
const Quotes = Loadable(lazy(() => import('../pages/Admin/Quotes/Quotes')));

const QuotesDetails = Loadable(
  lazy(() => import('../pages/Admin/Quotes/QuotesDetails'))
);

const TransactionID = Loadable(
  lazy(() => import('../pages/Admin/Orders/TransactionID'))
);

// const ServiceOrderDetails = Loadable(
//   lazy(() => import('../pages/Admin/Orders/ServiceOrderDetails'))
// );

const Productreview = Loadable(
  lazy(() => import('../pages/Admin/Reviewss/Productreview'))
);

const Coupon = Loadable(lazy(() => import('../pages/Admin/Coupon/Coupon')));

const AddCoupon = Loadable(
  lazy(() => import('../pages/Admin/Coupon/AddCupon'))
);

const EditCoupon = Loadable(
  lazy(() => import('../pages/Admin/Coupon/Editcupon'))
);

const GallerySetting = Loadable(
  lazy(() => import('../pages/Admin/Settingss/Gallery/Gallery'))
);
const AddGallery = Loadable(
  lazy(() => import('../pages/Admin/Settingss/Gallery/AddGallery'))
);

const Issues = Loadable(lazy(() => import('../pages/Admin/Issues/Issues')));

const MostBookedService = Loadable(
  lazy(
    () => import('../pages/Admin/Settingss/MostBookedService/MostBookedService')
  )
);

const Support = Loadable(lazy(() => import('../pages/Admin/Support/Support')));
const RentalOrderDetails = Loadable(
  lazy(() => import('../pages/Admin/Orders/RentalOrderDetails'))
);
const RepairOrderDetails = Loadable(
  lazy(() => import('../pages/Admin/Orders/RepairOrderDetails'))
);

const RefurbishedOrderDetails = Loadable(
  lazy(() => import('../pages/Admin/Orders/RefurbishedOrderDetails'))
);

const Email = Loadable(lazy(() => import('../pages/Admin/Email/Email')));

const AdminFaq = Loadable(lazy(() => import('../pages/Admin/Faq/Faq')));
const AdminAboutUs = Loadable(
  lazy(() => import('../pages/Admin/AboutUs/AboutUs'))
);

const PriceComparison = Loadable(
  lazy(() => import('../pages/Admin/Settingss/PriceComparison/PriceComparison'))
);

const EmailTemplate = Loadable(
  lazy(() => import('../pages/Admin/EmailTemplate/EmailTemplate'))
);

const BillInformation = Loadable(
  lazy(() => import('../pages/Admin/BillInformation/BillInformation'))
);

const CustomLaptopRequests = Loadable(
  lazy(() => import('../pages/Admin/CustomLaptopRequests/CustomLaptopRequests'))
);

const Preview = Loadable(
  lazy(() => import('../pages/Admin/BillInformation/Preview'))
);

const Invoice = Loadable(lazy(() => import('../pages/Admin/Invoice/Invoice')));

const RequestDetails = Loadable(
  lazy(() => import('../pages/Admin/Support/RequestDetails'))
);

const ServiceArea = Loadable(
  lazy(() => import('../pages/Admin/Settingss/ServiceArea/ServiceArea'))
);

