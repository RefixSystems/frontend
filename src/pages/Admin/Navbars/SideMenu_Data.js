import * as Yup from 'yup';

export const CouponSchema = Yup.object().shape({
  limit: Yup.number().required('Limit  is required'),
  code: Yup.string().required('Code is required'),
  value: Yup.string().required('Value is required'),
  description: Yup.string().required('Description is required'),
  startDate: Yup.string().required('Start Date is required'),
  endDate: Yup.string().required('End Date required'),
});

import {
  MdAdminPanelSettings,
  MdContactMail,
  MdHomeRepairService,
  MdPeopleAlt,
  MdPriceChange,
  MdReport,
} from 'react-icons/md';
import { FaQuestionCircle, FaUser } from 'react-icons/fa';
import { FaStar } from 'react-icons/fa';
import { MdWorkHistory } from 'react-icons/md';
import { FaMoneyBillTrendUp, FaUsers } from 'react-icons/fa6';
import { ImUserTie } from 'react-icons/im';
import { RiCheckboxMultipleBlankFill, RiComputerFill } from 'react-icons/ri';
import { RiCheckboxMultipleFill } from 'react-icons/ri';
import { faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons';
import { faHeadset } from '@fortawesome/free-solid-svg-icons';
import { faBookBookmark } from '@fortawesome/free-solid-svg-icons';
import { FaLayerGroup } from 'react-icons/fa6';
import { IoSettingsSharp } from 'react-icons/io5';
import { BsChatRightQuoteFill, BsFillLaptopFill, BsPersonFillLock } from 'react-icons/bs';
import { MdReviews } from 'react-icons/md';
import { MdRateReview } from 'react-icons/md';
import { IoGiftSharp } from 'react-icons/io5';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { TbMessageReport } from 'react-icons/tb';
import { GiLaptop } from "react-icons/gi";

export const sidebarItems = [
  {
    id: 1,
    label: ' Dashboard',
    parent_id: null,
    icon: <MdAdminPanelSettings size={20} />,
    module: 'dashboard',
    order_index: 1,
    url: '/admin/dashboard',
  },
  {
    id: 2,
    label: 'User List',
    parent_id: null,
    icon: <FaUser size={20} />,
    module: 'user',
    order_index: 2,
    url: '/admin/user-list',
  },
  {
    id: 3,
    label: 'Coupon',
    parent_id: null,
    icon: <IoGiftSharp size={20} />,
    module: 'coupon_code',
    order_index: 3,
    url: '/admin/coupon',
  },

  {
    id: 4,
    label: 'Transaction',
    parent_id: null,
    icon: <MdWorkHistory size={20} />,
    module: 'transaction',
    order_index: 4,
    url: '/admin/transactions',
  },

  {
    id: 5,
    label: 'Support',
    parent_id: null,
    icon: <FontAwesomeIcon icon={faHeadset} />,
    module: 'support',
    order_index: 5,
    url: '/admin/support',
  },
  {
    id: 6,
    label: 'Quotes',
    parent_id: null,
    icon: <BsChatRightQuoteFill size={20} />,
    module: 'quotation_requests',
    order_index: 6,
    url: '/admin/quotes',
  },

  {
    id: 7,
    label: 'Orders',
    parent_id: null,
    icon: <FontAwesomeIcon icon={faCartShopping} size="lg" />,
    module: 'order',
    order_index: 7,
    url: '/admin/orders',
  },
  {
    id: 8,
    label: 'Role & Module',
    parent_id: null,
    icon: <BsPersonFillLock size={20} />,
    module: 'module_access',
    order_index: 8,
    url: '/admin/role-access',
  },
  {
    id: 9,
    label: 'Employee',
    parent_id: null,
    icon: <MdPeopleAlt size={20} />,
    module: 'employee',
    order_index: 9,
    url: '/admin/employee',
  },
  {
    id: 10,
    label: 'Employee Roles',
    parent_id: null,
    icon: <ImUserTie size={20} />,
    module: 'employee_role',
    order_index: 10,
    url: '/admin/employee-roles',
  },

  {
    id: 11,
    label: 'Categories',
    parent_id: null,
    icon: <RiCheckboxMultipleFill size={20} />,
    module: 'category',
    order_index: 11,
    url: '/admin/categories',
  },
  {
    id: 12,
    label: 'Price Chart',
    parent_id: null,
    icon: <MdPriceChange size={20} />,
    module: 'price_chart',
    order_index: 12,
    url: '/admin/price-chart',
  },

  {
    id: 13,
    label: 'Reviews',
    parent_id: null,
    icon: <FaStar size={20} />,
    module: 'reviews',
    order_index: 13,
    url: '/',
    children: [
      {
        id: 14,
        label: ' General Review',
        parent_id: 13,
        icon: <MdReviews size={20} />,
        module: 'review',
        order_index: 14,
        url: '/admin/review',
      },
      {
        id: 15,
        label: 'Product Review',
        parent_id: 13,
        icon: <MdRateReview size={20} />,
        module: 'reviews_products',
        order_index: 15,
        url: '/admin/product-review',
      },
    ],
  },

  {
    id: 16,
    label: 'Sub Category',
    parent_id: null,
    icon: <RiCheckboxMultipleBlankFill size={20} />,
    module: 'subcategory',
    order_index: 16,
    url: '/',
    children: [
      {
        id: 17,
        label: 'Repair & Service',
        parent_id: 16,
        icon: <FontAwesomeIcon icon={faScrewdriverWrench} />,
        module: 'device',
        order_index: 17,
        url: '/admin/devices',
      },
      {
        id: 18,
        label: 'Rental',
        parent_id: 16,
        icon: <BsFillLaptopFill size={20} />,
        module: 'rental_laptop',
        order_index: 18,
        url: '/admin/rental',
      },
      {
        id: 19,
        label: 'Refurbished',
        parent_id: 16,
        icon: <RiComputerFill size={20} />,
        module: 'refurbished_laptop',
        order_index: 19,
        url: '/admin/refurbished-laptop',
      },
    ],
  },
  {
    id: 20,
    label: 'Settings',
    parent_id: null,
    icon: <IoSettingsSharp size={20} />,
    module: 'settings',
    order_index: 20,
    url: '/',
    children: [
      {
        id: 21,
        label: 'General',
        parent_id: 20,
        icon: <FaUsers size={20} />,
        module: 'general_settings',
        order_index: 21,
        url: '/admin/general',
      },
      {
        id: 22,
        label: 'Credentials',
        parent_id: 20,
        icon: <FaLayerGroup size={20} />,
        module: 'credentials_settings',
        order_index: 22,
        url: '/admin/credentials',
      },
      {
        id: 23,
        label: 'Service Area',
        parent_id: 20,
        icon: <MdHomeRepairService  size={20}  />,
        module: 'service_area',
        order_index: 23,
        url: '/admin/service-area',
      },
      {
        id: 24,
        label: 'Most Booked Service',
        parent_id: 20,
        icon: <FontAwesomeIcon icon={faBookBookmark} size="lg" />,
        module: 'mostBookedService',
        order_index: 24,
        url: '/admin/most-bookedservice',
      },
      // {
      //   id: 24,
      //   label: 'Price Comparison',
      //   parent_id: 20,
      //   icon: <FaMoneyBillTrendUp size={20}/>,
      //   module: 'price_comparison',
      //   order_index: 24,
      //   url: '/admin/price-comparison',
      // },
    ],
  },
  {
    id: 25,
    label: 'Reports',
    parent_id: null,
    icon: <MdReport size={20} />,
    module: 'reports',
    order_index: 25,
    url: '/',
    children: [
      {
        id: 26,
        label: 'Employee Reports',
        parent_id: 25,
        icon: <MdPeopleAlt size={20} />,
        module: 'employee_reports',
        order_index: 26,
        url: '/admin/employee-reports',
      },
      {
        id: 27,
        label: 'Order Reports',
        parent_id: 25,
        icon: <FontAwesomeIcon icon={faCartShopping} size="lg" />,
        module: 'order_reports',
        order_index: 27,
        url: '/admin/order-reports',
      },
      {
        id: 28,
        label: 'User Reports',
        parent_id: 25,
        icon: <FaUser size={20} />,
        module: 'user_reports',
        order_index: 28,
        url: '/admin/user-reports',
      },
      {
        id: 29,
        label: 'Rental Product',
        parent_id: 25,
        icon: <BsFillLaptopFill size={20} />,
        module: 'rental_reports',
        order_index: 29,
        url: '/admin/rental-product',
      },
      {
        id: 30,
        label: 'Refurbished Product',
        parent_id: 25,
        icon: <RiComputerFill size={20} />,
        module: 'refurbished_reports',
        order_index: 30,
        url: '/admin/refurbished-product',
      },
    ],
  },
  {
    id: 31,
    label: 'Faq',
    parent_id: null,
    icon: <FaQuestionCircle size={20} />,
    module: 'faq',
    order_index: 31,
    url: '/admin/faq',
  },
  {
    id: 32,
    label: 'About Us',
    parent_id: null,
    icon: <TbMessageReport size={20} />,
    module: 'about_us',
    order_index: 32,
    url: '/admin/about-us',
  },
  {
    id: 33,
    label: 'Email Template',
    parent_id: null,
    icon: <MdContactMail  size={20} />,
    module: 'email_templates',
    order_index: 33,
    url: '/admin/email-template',
  },
  // {
  //   id: 34,
  //   label: 'Custom Laptop Requests',
  //   parent_id: null,
  //   icon: <GiLaptop   size={20} />,
  //   module: 'custom_requests',
  //   order_index: 34,
  //   url: '/admin/customlaptop-requests',
  // },
];
