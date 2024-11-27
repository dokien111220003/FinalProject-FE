import AdminPage from "../pages/AdminPage/AdminPage";
import DetailsOrderPage from "../pages/DetailsOrderPage/DetailsOrderPage";
import HomePage from "../pages/HomePage/HomePage";
import MyOrderPage from "../pages/MyOrder/MyOrder";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import OrderPage from "../pages/OrderPage/OrderPage";
import OrderSucess from "../pages/OrderSuccess/OrderSuccess";
import PaymentPage from "../pages/PaymentPage/PaymentPage";
import ProductDetailsPage from "../pages/ProductDetailsPage/ProductDetailsPage";
import ProductsPage from "../pages/ProductsPage/ProductsPage";
import ProfilePage from "../pages/Profile/ProfilePage";
import SignInPage from "../pages/SignInPage/SignInPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import TypeProductPage from "../pages/TypeProductPage/TypeProductPage";
import AboutPage from "../pages/AboutPage/AboutPage";
import ContactPage from "../pages/ContactPage/ContactPage";
import NewProductsPage from "../pages/NewProductsPage/NewProductsPage";
import BestSellerPage from "../pages/BestSellerPage/BestSellerPage";
import HotDealsPage from "../pages/HotDealsPage/HotDealsPage";
import BestRatedPage from "../pages/BestRatedPage/BestRatedPage";

export const routes = [
    {
        path: '/',
        page: HomePage,
        isShowHeader: true //1
    },
    {
        path: '/order',
        page: OrderPage,
        isShowHeader: true
    },
    {
        path: '/my-order',
        page: MyOrderPage,
        isShowHeader: true
    },
    {
        path: '/details-order/:id',
        page: DetailsOrderPage,
        isShowHeader: true
    },
    {
        path: '/payment',
        page: PaymentPage,
        isShowHeader: true
    },
    {
        path: '/orderSuccess',
        page: OrderSucess,
        isShowHeader: true
    },
    {
        path: '/products',
        page: ProductsPage,
        isShowHeader: true
    },
    {
        path: '/product/:type',
        page: TypeProductPage,
        isShowHeader: true
    },
    {
        path: '/sign-in',
        page: SignInPage,
        isShowHeader: false
    },
    {
        path: '/sign-up',
        page: SignUpPage,
        isShowHeader: false
    },
    {
        path: '/product-details/:id',
        page: ProductDetailsPage,
        isShowHeader: true //2
    },
    {
        path: '/profile-user',
        page: ProfilePage,
        isShowHeader: true
    },
    {
        path: '/system/admin',
        page: AdminPage,
        isShowHeader: false,
        isPrivated: true
    },
    {
        path: '*',
        page: NotFoundPage
    },
    {
        path: '/about',
        page: AboutPage,
        isShowHeader: true
    },
    {
        path: '/contact',
        page: ContactPage,
        isShowHeader: true
    },
    {
        path: '/new-products',
        page: NewProductsPage,
        isShowHeader: true
    },
    {
        path: '/best-sellers',
        page: BestSellerPage,
        isShowHeader: true
    },
    {
        path: '/hot-deals',
        page: HotDealsPage,
        isShowHeader: true
    },
    {
        path: '/best-rated',
        page: BestRatedPage,
        isShowHeader: true
    }
]