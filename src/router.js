import Vue from 'vue';
import Router from 'vue-router';

import OrderFormPage from '@/views/OrderFormPage';

import ShippingInfo from '@/components/ShippingInfo';
import BillingInfo from '@/components/BillingInfo';
import Payment from '@/components/Payment';
import Check from '@/components/Check';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      component: OrderFormPage,
      children: [
        {
          path: '',
          component: ShippingInfo
        },
        {
          path: 'billing',
          component: BillingInfo
        },
        {
          path: 'payment',
          component: Payment
        },
        {
          path: 'check',
          component: Check
        }
      ]
    }
  ],
  mode: 'history'
});

export default router;