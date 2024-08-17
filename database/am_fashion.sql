-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jul 07, 2024 at 03:33 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `am_fashion`
--

-- --------------------------------------------------------

--
-- Table structure for table `affiliate_profits`
--

CREATE TABLE `affiliate_profits` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `affiliate_percent` int(11) NOT NULL,
  `product_price` varchar(255) NOT NULL,
  `affiliate_amount` varchar(255) NOT NULL,
  `order_invoice` varchar(255) NOT NULL,
  `date` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `status` enum('1','0') NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `status`, `deleted_at`, `created_at`, `updated_at`) VALUES
(1, 'Panjabi', '1', NULL, '2024-07-07 07:19:10', '2024-07-07 07:19:10'),
(2, 'Shart', '1', NULL, '2024-07-07 07:19:17', '2024-07-07 07:19:17'),
(3, 'T-Shart', '1', NULL, '2024-07-07 07:19:27', '2024-07-07 07:19:27');

-- --------------------------------------------------------

--
-- Table structure for table `company_setups`
--

CREATE TABLE `company_setups` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `contact` varchar(255) NOT NULL,
  `payment_no` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `social_link` varchar(255) DEFAULT NULL,
  `company_logo` varchar(255) NOT NULL,
  `trending` longtext NOT NULL,
  `trending_image` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `company_setups`
--

INSERT INTO `company_setups` (`id`, `name`, `address`, `contact`, `payment_no`, `email`, `social_link`, `company_logo`, `trending`, `trending_image`, `created_at`, `updated_at`) VALUES
(1, 'AM FASHION', 'Dhaka', '019xxxxxxx', '019xxxxxxx', 'amfashion@gmail.com', NULL, 'Media/CompanyImage/company_logo1720358286.png', '<h2><strong style=\"background-color: rgb(255, 255, 255); color: rgb(41, 43, 44);\">AM FASHION</strong></h2><p><span style=\"background-color: rgb(255, 255, 255); color: rgb(134, 127, 127);\">Because comfort and confidence go hand in hand.</span></p><p><span style=\"background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);\">We focus on carefully selecting the best clothing that is comfortable, looks great, and makes you confident. Apart from the fabric, design and fit, we go through strict quality control parameters to give you what you truly deserve. The power of a good outfit is how it can influence your perception of yourself.We focus on carefully selecting the best clothing that is comfortable, looks great, and makes you confident. Apart from the fabric, design and fit</span></p><p><br></p>', 'Media/CompanyImage/trending_image1720358286.png', '2024-07-07 07:18:07', '2024-07-07 07:18:07');

-- --------------------------------------------------------

--
-- Table structure for table `coupons`
--

CREATE TABLE `coupons` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `coupon_name` varchar(255) NOT NULL,
  `order_count` int(11) DEFAULT 0,
  `order_amount` int(11) DEFAULT 0,
  `coupon_percent` int(11) NOT NULL,
  `details` varchar(255) DEFAULT NULL,
  `coupon_validity_date` varchar(255) NOT NULL,
  `status` enum('1','2') NOT NULL COMMENT 'active/deactive',
  `slug` varchar(255) NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `coupons`
--

INSERT INTO `coupons` (`id`, `coupon_name`, `order_count`, `order_amount`, `coupon_percent`, `details`, `coupon_validity_date`, `status`, `slug`, `deleted_at`, `created_at`, `updated_at`) VALUES
(1, 'LUCK100', 0, 1000, 5, NULL, '2024-09-06', '1', '76eceff1cc93', NULL, '2024-07-07 07:24:18', '2024-07-07 07:24:18'),
(2, 'LUCK1000', 0, 3000, 10, NULL, '2024-12-25', '1', '75bf72dd7c18', NULL, '2024-07-07 07:24:41', '2024-07-07 07:24:41');

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `phone` varchar(255) NOT NULL,
  `address` longtext NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `district` varchar(255) NOT NULL,
  `post_code` int(11) DEFAULT NULL,
  `affiliate_amount` varchar(255) DEFAULT '0',
  `affiliate_amount_used` varchar(255) NOT NULL DEFAULT '0',
  `affiliate_amount_blanch` varchar(255) NOT NULL DEFAULT '0',
  `slug` varchar(255) NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`id`, `user_id`, `phone`, `address`, `email`, `district`, `post_code`, `affiliate_amount`, `affiliate_amount_used`, `affiliate_amount_blanch`, `slug`, `deleted_at`, `created_at`, `updated_at`) VALUES
(1, 2, '01936008507', '11 North Harrison Street', 'samad@gmail.com', 'Dhaka', 7017, '0', '0', '0', 'a86836e4c8db', NULL, '2024-07-07 07:30:39', '2024-07-07 07:30:39');

-- --------------------------------------------------------

--
-- Table structure for table `customer_payments`
--

CREATE TABLE `customer_payments` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `customer_id` bigint(20) UNSIGNED NOT NULL,
  `order_invoice_id` bigint(20) UNSIGNED NOT NULL,
  `date` varchar(255) NOT NULL,
  `payment_type_setting_id` int(11) NOT NULL,
  `invoice_amount` varchar(255) DEFAULT '0',
  `shipping_charge` varchar(255) DEFAULT '0',
  `payment_details` varchar(255) DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `customer_payments`
--

INSERT INTO `customer_payments` (`id`, `customer_id`, `order_invoice_id`, `date`, `payment_type_setting_id`, `invoice_amount`, `shipping_charge`, `payment_details`, `deleted_at`, `created_at`, `updated_at`) VALUES
(1, 1, 1, '2024-07-07', 1, '3000', '120', NULL, NULL, '2024-07-07 07:30:39', '2024-07-07 07:30:39');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `home_sliders`
--

CREATE TABLE `home_sliders` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `home_sliders`
--

INSERT INTO `home_sliders` (`id`, `name`, `image`, `deleted_at`, `created_at`, `updated_at`) VALUES
(1, '1', 'Media/SliderImage/1720358465.xuw8tn.PIB.png', NULL, '2024-07-07 07:21:06', '2024-07-07 07:21:06'),
(2, '2', 'Media/SliderImage/1720358473.vlm93r.PIB.jpg', NULL, '2024-07-07 07:21:13', '2024-07-07 07:21:13'),
(3, '3', 'Media/SliderImage/1720358480.fv3jdr.PIB.jpg', NULL, '2024-07-07 07:21:20', '2024-07-07 07:21:20'),
(4, '4', 'Media/SliderImage/1720358496.g0h1ml.PIB.png', NULL, '2024-07-07 07:21:36', '2024-07-07 07:21:36');

-- --------------------------------------------------------

--
-- Table structure for table `image_gallery`
--

CREATE TABLE `image_gallery` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `image` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `image_gallery`
--

INSERT INTO `image_gallery` (`id`, `product_id`, `image`, `created_at`, `updated_at`) VALUES
(1, 1, 'Media/ProductGallery/1720358836.wszdkb.PIB.png', '2024-07-07 07:27:17', '2024-07-07 07:27:17'),
(2, 1, 'Media/ProductGallery/1720358837.ajcpqx.PIB.png', '2024-07-07 07:27:17', '2024-07-07 07:27:17'),
(3, 1, 'Media/ProductGallery/1720358837.30c96y.PIB.png', '2024-07-07 07:27:17', '2024-07-07 07:27:17'),
(4, 2, 'Media/ProductGallery/1720358993.9mg2iy.PIB.png', '2024-07-07 07:29:53', '2024-07-07 07:29:53'),
(5, 2, 'Media/ProductGallery/1720358993.eyi2f8.PIB.png', '2024-07-07 07:29:53', '2024-07-07 07:29:53'),
(6, 2, 'Media/ProductGallery/1720358993.olpm15.PIB.png', '2024-07-07 07:29:54', '2024-07-07 07:29:54'),
(7, 2, 'Media/ProductGallery/1720358994.rbnzyh.PIB.png', '2024-07-07 07:29:54', '2024-07-07 07:29:54'),
(8, 2, 'Media/ProductGallery/1720358994.jxrden.PIB.png', '2024-07-07 07:29:54', '2024-07-07 07:29:54');

-- --------------------------------------------------------

--
-- Table structure for table `inventories`
--

CREATE TABLE `inventories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_reset_tokens_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1),
(4, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(5, '2024_05_20_055617_create_permission_tables', 1),
(6, '2024_05_20_073027_create_categories_table', 1),
(7, '2024_05_20_073114_create_sub_categories_table', 1),
(8, '2024_05_20_073231_create_inventories_table', 1),
(9, '2024_05_20_073301_create_products_table', 1),
(10, '2024_05_20_073336_create_return_policys_table', 1),
(11, '2024_05_20_074703_create_sub_sub_categorys_table', 1),
(12, '2024_05_22_122541_create_company_setups_table', 1),
(13, '2024_06_05_103302_create_orders_table', 1),
(14, '2024_06_05_103344_create_customers_table', 1),
(15, '2024_06_05_103550_create_shippings_table', 1),
(16, '2024_06_05_103700_create_coupons_table', 1),
(17, '2024_06_05_103827_create_customer_payments_table', 1),
(18, '2024_06_05_104735_create_affiliate_profits_table', 1),
(19, '2024_06_05_105435_create_payment_type_settings_table', 1),
(20, '2024_06_05_141501_create_order_invoices_table', 1),
(21, '2024_06_06_085058_create_product_images_table', 1),
(22, '2024_06_12_181045_create_home_sliders_table', 1),
(23, '2024_07_03_125505_create_wish_lists_table', 1),
(24, '2024_07_07_112915_create_image_gallery_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `model_has_permissions`
--

CREATE TABLE `model_has_permissions` (
  `permission_id` bigint(20) UNSIGNED NOT NULL,
  `model_type` varchar(255) NOT NULL,
  `model_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `model_has_roles`
--

CREATE TABLE `model_has_roles` (
  `role_id` bigint(20) UNSIGNED NOT NULL,
  `model_type` varchar(255) NOT NULL,
  `model_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `model_has_roles`
--

INSERT INTO `model_has_roles` (`role_id`, `model_type`, `model_id`) VALUES
(1, 'App\\Models\\User', 1),
(3, 'App\\Models\\User', 2),
(3, 'App\\Models\\User', 3);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `order_invoice_id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `categorie_id` int(11) NOT NULL,
  `sub_category_id` int(11) NOT NULL,
  `sub_sub_category_id` int(11) DEFAULT NULL,
  `regular_price` varchar(255) DEFAULT '0',
  `sale_price` varchar(255) NOT NULL,
  `quantity` varchar(255) NOT NULL,
  `sale_amount_total` varchar(255) NOT NULL,
  `flat_discount` varchar(255) DEFAULT '0',
  `actual_amount` varchar(255) DEFAULT '0',
  `affiliate_amount` varchar(255) DEFAULT '0',
  `size` varchar(255) DEFAULT NULL,
  `color` varchar(255) DEFAULT NULL,
  `product_barcode` varchar(255) DEFAULT NULL,
  `product_serial` varchar(255) DEFAULT NULL,
  `sale_date` varchar(255) NOT NULL,
  `update_by` int(11) DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `order_invoice_id`, `product_id`, `categorie_id`, `sub_category_id`, `sub_sub_category_id`, `regular_price`, `sale_price`, `quantity`, `sale_amount_total`, `flat_discount`, `actual_amount`, `affiliate_amount`, `size`, `color`, `product_barcode`, `product_serial`, `sale_date`, `update_by`, `deleted_at`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 1, 1, NULL, '1800', '1500', '1', '1500', '300', '1500', '0', 'M', 'Red', NULL, NULL, '2024-07-07', NULL, NULL, '2024-07-07 07:30:39', '2024-07-07 07:30:39'),
(2, 1, 1, 1, 1, NULL, '1800', '1500', '1', '1500', '300', '1500', '0', 'XL', 'Red', NULL, NULL, '2024-07-07', NULL, NULL, '2024-07-07 07:30:39', '2024-07-07 07:30:39');

-- --------------------------------------------------------

--
-- Table structure for table `order_invoices`
--

CREATE TABLE `order_invoices` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `customer_id` bigint(20) UNSIGNED NOT NULL,
  `invoice` varchar(255) NOT NULL,
  `sale_count` int(11) NOT NULL,
  `sale_price` varchar(255) NOT NULL,
  `coupon_id` int(11) DEFAULT NULL,
  `coupon_discount_amount` varchar(255) DEFAULT '0',
  `affiliate_amount_total` varchar(255) DEFAULT '0',
  `invoice_amount` varchar(255) NOT NULL,
  `sale_date` varchar(255) NOT NULL,
  `delivery` varchar(255) NOT NULL COMMENT 'home/office',
  `shipping_charge` varchar(255) DEFAULT '0',
  `parcel_shipping_details` longtext DEFAULT NULL,
  `note` longtext DEFAULT NULL,
  `delivery_date` varchar(255) DEFAULT NULL,
  `status` enum('1','2','3','4','5') NOT NULL COMMENT 'order/process/delivery/success/return',
  `update_by` int(11) DEFAULT NULL,
  `slug` varchar(255) NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `order_invoices`
--

INSERT INTO `order_invoices` (`id`, `customer_id`, `invoice`, `sale_count`, `sale_price`, `coupon_id`, `coupon_discount_amount`, `affiliate_amount_total`, `invoice_amount`, `sale_date`, `delivery`, `shipping_charge`, `parcel_shipping_details`, `note`, `delivery_date`, `status`, `update_by`, `slug`, `deleted_at`, `created_at`, `updated_at`) VALUES
(1, 1, '88259419', 2, '3000', 0, NULL, '0', '3000', '2024-07-07', 'Home', '120', NULL, NULL, NULL, '2', NULL, 'd493c1cabe59', NULL, '2024-07-07 07:30:39', '2024-07-07 07:30:42');

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `payment_type_settings`
--

CREATE TABLE `payment_type_settings` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `is_default` tinyint(1) NOT NULL DEFAULT 0,
  `status` enum('1','2') NOT NULL COMMENT 'active/deactive',
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `payment_type_settings`
--

INSERT INTO `payment_type_settings` (`id`, `name`, `image`, `is_default`, `status`, `deleted_at`, `created_at`, `updated_at`) VALUES
(1, 'Cash On Delevery', 'Media/PaymentType/image1720358607.png', 1, '1', NULL, '2024-07-07 07:23:27', '2024-07-07 07:23:27'),
(2, 'Bkash', 'Media/PaymentType/image1720358623.png', 0, '1', NULL, '2024-07-07 07:23:43', '2024-07-07 07:23:43');

-- --------------------------------------------------------

--
-- Table structure for table `permissions`
--

CREATE TABLE `permissions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `guard_name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `permissions`
--

INSERT INTO `permissions` (`id`, `name`, `guard_name`, `created_at`, `updated_at`) VALUES
(1, 'user', 'web', '2024-07-07 07:12:10', '2024-07-07 07:12:10'),
(2, 'setting', 'web', '2024-07-07 07:12:10', '2024-07-07 07:12:10'),
(3, 'product', 'web', '2024-07-07 07:12:10', '2024-07-07 07:12:10'),
(4, 'affiliate', 'web', '2024-07-07 07:12:10', '2024-07-07 07:12:10'),
(5, 'payment', 'web', '2024-07-07 07:12:10', '2024-07-07 07:12:10'),
(6, 'orders', 'web', '2024-07-07 07:12:10', '2024-07-07 07:12:10'),
(7, 'customer', 'web', '2024-07-07 07:12:10', '2024-07-07 07:12:10');

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `categorie_id` bigint(20) UNSIGNED NOT NULL,
  `sub_category_id` int(11) DEFAULT NULL,
  `sub_sub_category_id` int(11) DEFAULT NULL,
  `supplier_id` int(11) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `sku` varchar(255) DEFAULT NULL,
  `regular_price` varchar(255) NOT NULL DEFAULT '0',
  `sale_price` varchar(255) NOT NULL DEFAULT '0',
  `discount_percent` varchar(255) DEFAULT '0',
  `discount_amount` varchar(255) DEFAULT '0',
  `shipping_id` varchar(255) NOT NULL,
  `description` longtext NOT NULL,
  `offer_for_you` longtext NOT NULL,
  `return_exchange_policy` longtext NOT NULL,
  `colors` varchar(255) DEFAULT NULL,
  `size` varchar(255) DEFAULT NULL,
  `material` varchar(255) DEFAULT NULL,
  `tags` varchar(255) DEFAULT NULL,
  `in_stock` tinyint(1) NOT NULL DEFAULT 1,
  `affiliate_percent` varchar(255) DEFAULT '0',
  `is_affiliate` tinyint(1) NOT NULL DEFAULT 0,
  `hot_product` enum('2','1') NOT NULL COMMENT 'not-2/yes-1',
  `slug` varchar(255) NOT NULL,
  `status` enum('1','2') NOT NULL COMMENT 'active/deactive',
  `create_by_user_id` int(11) NOT NULL COMMENT 'product add by login id',
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `categorie_id`, `sub_category_id`, `sub_sub_category_id`, `supplier_id`, `name`, `sku`, `regular_price`, `sale_price`, `discount_percent`, `discount_amount`, `shipping_id`, `description`, `offer_for_you`, `return_exchange_policy`, `colors`, `size`, `material`, `tags`, `in_stock`, `affiliate_percent`, `is_affiliate`, `hot_product`, `slug`, `status`, `create_by_user_id`, `deleted_at`, `created_at`, `updated_at`) VALUES
(1, 1, 1, NULL, NULL, 'Regular  Pangabi', NULL, '1800', '1500', '0', '0', '1', 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that', 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use', 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use', 'Red,White,Blue', 'M,L,XL,XXL', NULL, NULL, 1, NULL, 0, '1', '9dc5363f3eec', '1', 1, NULL, '2024-07-07 07:27:16', '2024-07-07 07:27:16'),
(2, 1, 1, NULL, NULL, 'New Panjabi Daily Use', NULL, '2200', '2000', '0', '0', '1', 'the readable content of a page when looking at its layout. Th', 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use', 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use', 'Red,White,Green,Blue', 'M,L,XL,XXL', NULL, NULL, 1, NULL, 0, '1', '1a6ce7a09416', '1', 1, NULL, '2024-07-07 07:29:53', '2024-07-07 07:29:53');

-- --------------------------------------------------------

--
-- Table structure for table `product_images`
--

CREATE TABLE `product_images` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `featured_image` varchar(255) NOT NULL,
  `arrival_image` varchar(255) NOT NULL,
  `product_image` varchar(255) NOT NULL,
  `product_image_large` varchar(255) NOT NULL,
  `product_image_big` varchar(255) NOT NULL,
  `product_image_small` varchar(255) NOT NULL,
  `size_chart_image` varchar(255) DEFAULT NULL,
  `measure_image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `product_images`
--

INSERT INTO `product_images` (`id`, `product_id`, `featured_image`, `arrival_image`, `product_image`, `product_image_large`, `product_image_big`, `product_image_small`, `size_chart_image`, `measure_image`, `created_at`, `updated_at`) VALUES
(1, 1, 'Media/ProductImage/1720358836.bgc714.PIB.png', 'Media/ProductImage/1720358836.4syauq.PIB.png', 'Media/ProductImage/1720358836.rdy72g.PIB.png', 'Media/ProductImage/1720358836.2edhco.PIB.png', 'Media/ProductImage/1720358836.6i80gy.PIB.png', 'Media/ProductImage/1720358836.vijtyg.PIB.png', 'Media/ProductImage/1720358836.msgy2q.PIB.png', NULL, '2024-07-07 07:27:16', '2024-07-07 07:27:16'),
(2, 2, 'Media/ProductImage/1720358993.m0dzne.PIB.png', 'Media/ProductImage/1720358993.ml19sq.PIB.png', 'Media/ProductImage/1720358993.9y7afk.PIB.png', 'Media/ProductImage/1720358993.ugwst0.PIB.png', 'Media/ProductImage/1720358993.glhku9.PIB.png', 'Media/ProductImage/1720358993.f4zruw.PIB.png', NULL, NULL, '2024-07-07 07:29:53', '2024-07-07 07:29:53');

-- --------------------------------------------------------

--
-- Table structure for table `return_policys`
--

CREATE TABLE `return_policys` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `offer_for_you` longtext NOT NULL,
  `return_exchange_policy` longtext NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `return_policys`
--

INSERT INTO `return_policys` (`id`, `offer_for_you`, `return_exchange_policy`, `created_at`, `updated_at`) VALUES
(1, 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use', 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use', '2024-07-07 07:22:22', '2024-07-07 07:22:22');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `guard_name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`, `guard_name`, `created_at`, `updated_at`) VALUES
(1, 'super_admin', 'web', '2024-07-07 07:12:09', '2024-07-07 07:12:09'),
(2, 'admin', 'web', '2024-07-07 07:12:09', '2024-07-07 07:12:09'),
(3, 'customer', 'web', '2024-07-07 07:12:09', '2024-07-07 07:12:09');

-- --------------------------------------------------------

--
-- Table structure for table `role_has_permissions`
--

CREATE TABLE `role_has_permissions` (
  `permission_id` bigint(20) UNSIGNED NOT NULL,
  `role_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `role_has_permissions`
--

INSERT INTO `role_has_permissions` (`permission_id`, `role_id`) VALUES
(1, 1),
(2, 1),
(3, 1),
(4, 1),
(5, 1),
(6, 1),
(7, 1);

-- --------------------------------------------------------

--
-- Table structure for table `shippings`
--

CREATE TABLE `shippings` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `in_dhaka` int(11) NOT NULL DEFAULT 0,
  `out_dhaka` int(11) NOT NULL DEFAULT 0,
  `details` varchar(255) DEFAULT NULL,
  `status` enum('1','2') NOT NULL COMMENT 'active/deactive',
  `slug` varchar(255) NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `shippings`
--

INSERT INTO `shippings` (`id`, `name`, `in_dhaka`, `out_dhaka`, `details`, `status`, `slug`, `deleted_at`, `created_at`, `updated_at`) VALUES
(1, 'Deafult', 60, 120, NULL, '1', 'b5e7f4ba770c', NULL, '2024-07-07 07:23:57', '2024-07-07 07:23:57');

-- --------------------------------------------------------

--
-- Table structure for table `sub_categories`
--

CREATE TABLE `sub_categories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `categorie_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `new_arrival` enum('2','1') NOT NULL COMMENT 'no/yes',
  `status` enum('1','0') NOT NULL,
  `home_show` enum('1','0') NOT NULL,
  `image` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sub_categories`
--

INSERT INTO `sub_categories` (`id`, `categorie_id`, `name`, `new_arrival`, `status`, `home_show`, `image`, `slug`, `deleted_at`, `created_at`, `updated_at`) VALUES
(1, 1, 'Regular  Pangabi', '1', '1', '1', 'Media/SubCatImage/1720358397.l2odt6.PIB.png', '838586b996df', NULL, '2024-07-07 07:19:57', '2024-07-07 07:19:57'),
(2, 2, 'Shart Regular', '1', '1', '1', 'Media/SubCatImage/1720358431.puaxht.PIB.png', 'c962315bb493', NULL, '2024-07-07 07:20:32', '2024-07-07 07:20:32'),
(3, 3, 'T SHART Mens', '1', '1', '1', 'Media/SubCatImage/1720358452.vx7ctf.PIB.png', 'fef7c8574289', NULL, '2024-07-07 07:20:52', '2024-07-07 07:20:52');

-- --------------------------------------------------------

--
-- Table structure for table `sub_sub_categorys`
--

CREATE TABLE `sub_sub_categorys` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `sub_categorie_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `status` enum('1','0') NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT 1,
  `is_update` tinyint(1) NOT NULL DEFAULT 0,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `phone`, `email_verified_at`, `password`, `image`, `status`, `is_update`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Admin', 'amfashion@gmail.com', '01823151351', NULL, '$2y$12$x2FTsJzjg.dzTMxZaWcfjeq3UlY39SepFBzrmjF9P3j3C0Acv6gTq', NULL, 1, 1, NULL, '2024-07-07 07:12:09', '2024-07-07 07:12:09'),
(2, 'Abdus Samad', 'samad@gmail.com', '01936008507', NULL, '$2y$12$FuIVHofJB/QJfdzeVUsMG.7jzWw5awXE2TXt3a6EDRWKgDfozZzDm', NULL, 1, 0, NULL, '2024-07-07 07:30:39', '2024-07-07 07:30:39'),
(3, 'Kamal', 'kamal@gmail.com', '01936008506', NULL, '$2y$12$UIFNdk2j4DMvAgXqrr2MkuXHQW2njCrP07O9BW9xyXCmUNcVuswPm', NULL, 1, 0, NULL, '2024-07-07 07:32:34', '2024-07-07 07:32:34');

-- --------------------------------------------------------

--
-- Table structure for table `wish_lists`
--

CREATE TABLE `wish_lists` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `customer_id` bigint(20) UNSIGNED NOT NULL,
  `size` varchar(255) DEFAULT NULL,
  `color` varchar(255) DEFAULT NULL,
  `quantity` varchar(255) NOT NULL,
  `product_image` varchar(255) NOT NULL,
  `regular_price` varchar(255) NOT NULL,
  `sale_price` varchar(255) NOT NULL,
  `user_id` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `affiliate_profits`
--
ALTER TABLE `affiliate_profits`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `company_setups`
--
ALTER TABLE `company_setups`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `coupons`
--
ALTER TABLE `coupons`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `customer_payments`
--
ALTER TABLE `customer_payments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `home_sliders`
--
ALTER TABLE `home_sliders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `image_gallery`
--
ALTER TABLE `image_gallery`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `inventories`
--
ALTER TABLE `inventories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `model_has_permissions`
--
ALTER TABLE `model_has_permissions`
  ADD PRIMARY KEY (`permission_id`,`model_id`,`model_type`),
  ADD KEY `model_has_permissions_model_id_model_type_index` (`model_id`,`model_type`);

--
-- Indexes for table `model_has_roles`
--
ALTER TABLE `model_has_roles`
  ADD PRIMARY KEY (`role_id`,`model_id`,`model_type`),
  ADD KEY `model_has_roles_model_id_model_type_index` (`model_id`,`model_type`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `order_invoices`
--
ALTER TABLE `order_invoices`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `payment_type_settings`
--
ALTER TABLE `payment_type_settings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `permissions_name_guard_name_unique` (`name`,`guard_name`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `product_images`
--
ALTER TABLE `product_images`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `return_policys`
--
ALTER TABLE `return_policys`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `roles_name_guard_name_unique` (`name`,`guard_name`);

--
-- Indexes for table `role_has_permissions`
--
ALTER TABLE `role_has_permissions`
  ADD PRIMARY KEY (`permission_id`,`role_id`),
  ADD KEY `role_has_permissions_role_id_foreign` (`role_id`);

--
-- Indexes for table `shippings`
--
ALTER TABLE `shippings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sub_categories`
--
ALTER TABLE `sub_categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sub_sub_categorys`
--
ALTER TABLE `sub_sub_categorys`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`),
  ADD UNIQUE KEY `users_phone_unique` (`phone`);

--
-- Indexes for table `wish_lists`
--
ALTER TABLE `wish_lists`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `affiliate_profits`
--
ALTER TABLE `affiliate_profits`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `company_setups`
--
ALTER TABLE `company_setups`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `coupons`
--
ALTER TABLE `coupons`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `customer_payments`
--
ALTER TABLE `customer_payments`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `home_sliders`
--
ALTER TABLE `home_sliders`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `image_gallery`
--
ALTER TABLE `image_gallery`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `inventories`
--
ALTER TABLE `inventories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `order_invoices`
--
ALTER TABLE `order_invoices`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `payment_type_settings`
--
ALTER TABLE `payment_type_settings`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `permissions`
--
ALTER TABLE `permissions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `product_images`
--
ALTER TABLE `product_images`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `return_policys`
--
ALTER TABLE `return_policys`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `shippings`
--
ALTER TABLE `shippings`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `sub_categories`
--
ALTER TABLE `sub_categories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `sub_sub_categorys`
--
ALTER TABLE `sub_sub_categorys`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `wish_lists`
--
ALTER TABLE `wish_lists`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `model_has_permissions`
--
ALTER TABLE `model_has_permissions`
  ADD CONSTRAINT `model_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `model_has_roles`
--
ALTER TABLE `model_has_roles`
  ADD CONSTRAINT `model_has_roles_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `role_has_permissions`
--
ALTER TABLE `role_has_permissions`
  ADD CONSTRAINT `role_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `role_has_permissions_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
