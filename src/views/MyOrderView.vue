<template>
<div class="flex flex-column align-items-center">
  <div class="w-9 my-6">
    <h1 class="flex justify-content-start w-full">
      <Button
        class="mr-4"
        icon="pi pi-arrow-left"
        outlined
        rounded
        @click="$router.push('/products')"
      />  My Orders
    </h1>

    <div class="card my-4">
      <DataTable :value="myOrders">
        <Column style="width: 8%;">
          <template #body="slotProps">
            <div
              class="my-order__image"
              @click="handleProductSelect(slotProps.data)"
            >
              <img
                :alt="slotProps.data.product.name"
                preview
                :src="`${slotProps.data.product.image}`"
              >
            </div>
          </template>
        </Column>
        <Column
          header="Product"
          style="width: 32%;"
        >
          <template #body="slotProps">
            {{ slotProps.data.product.title }}
          </template>
        </Column>
        <Column
          header="Price"
          style="width: 16%;"
        >
          <template #body="slotProps">
            <PriceComponent :price="slotProps.data.product.price" />
          </template>
        </Column>
        <Column
          header="Amount"
          style="width: 22%;"
        >
          <template #body="slotProps">
            <AmountComponent v-model="slotProps.data.amount" />
          </template>
        </Column>
        <Column
          header="Subtotal"
          style="width: 12%;"
        >
          <template #body="slotProps">
            <div>
              <PriceComponent :price="+((slotProps.data.product.price * slotProps.data.amount).toFixed(2))" />
            </div>
          </template>
        </Column>
        <Column style="width: 10%;">
          <template #body="slotProps">
            <Button
              v-tooltip="'Remove product'"
              icon="pi pi-times"
              rounded
              severity="danger"
              @click="confirmRemoveOrder(slotProps.data)"
            />
          </template>
        </Column>
        <template #footer>
          <div class="flex justify-content-end">
            <div class="flex align-items-center">
              <h3 class="mr-2 text-800">
                Total to Pay
              </h3>
              <PriceComponent :price="getTotalToPay()" />
            </div>
          </div>
        </template>
      </DataTable>
    </div>

    <div
      v-if="myOrders.length"
      class="flex justify-content-end"
    >
      <Button
        icon="pi pi-send"
        label="Proccess Order"
        :loading="isOrderProcessing"
        size="large"
        @click="handleProcessOrder"
      />
    </div>
  </div>
</div>

<ProductDialog
  v-model="isDialogVisible"
  :product="productSelected"
  @product:add="handleProductAdd"
/>
</template>

<script setup lang="ts">
import { ref, provide } from 'vue'

import { useRouter } from 'vue-router'

import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'

import AmountComponent from '../components/AmountComponent.vue'
import PriceComponent from '../components/PriceComponent.vue'
import ProductDialog from '../components/ProductDialog.vue'

import { useConfirm } from 'primevue/useconfirm'
import { useToast } from 'primevue/usetoast'

import { useStoreProducts } from '../composables'
import { Order, Product } from '../models'

const { myOrders, MODIFY_ORDER, REMOVE_ORDER, REMOVE_ORDERS } = useStoreProducts()

const isOrderProcessing = ref(false)
const isDialogVisible = ref(false)
const productSelected = ref<Product>()
const provideAmount = ref(0)
const orderId = ref('')

provide('provide-amount', provideAmount)

const router = useRouter()
const confirm = useConfirm()
const toast = useToast()

function handleProductSelect ({ id, product, amount }: {id: string, product: Product, amount: number}) {
  orderId.value = id
  productSelected.value = product
  provideAmount.value = amount
  isDialogVisible.value = true
}

function handleProductAdd (order: Order) {
  MODIFY_ORDER({ order: ({ ...order, id: orderId.value }), amount: provideAmount.value })
}

function getTotalToPay () {
  return +myOrders.value
    .reduce((acc, order) => acc += ((order.product.price as number) * order.amount), 0).toFixed(2)
}


function confirmRemoveOrder (order: Order) {
  confirm.require({
    message: 'Are you sure you want to remove the product?',
    header: 'Confirmation',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
      REMOVE_ORDER(order.id as string)
      toast.add({ severity: 'info', summary: 'Confirmed', detail: 'Product Removed', life: 3000 })
    }
  })
}

function handleProcessOrder () {
  confirm.require({
    message: 'Are you sure you want to process your order?',
    header: 'Confirmation',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
      isOrderProcessing.value = true
      setTimeout(() => {
        isOrderProcessing.value = false
        toast.add({ severity: 'info', summary: 'Confirmed', detail: 'Order processed Successfully', life: 3000 })
      }, 2000)

      setTimeout(() => {
        router.push('/products')
        REMOVE_ORDERS()
      }, 2500)
    }
  })
}

</script>

<style lang="scss">
.my-order {
  &__image {
    height: 96px;
    width: 64px;
    border: 1px solid white;

    & img {
      height: 100%;
      width: 100%;
      object-fit: cover;
      cursor: pointer;
    }
  }
}
</style>
