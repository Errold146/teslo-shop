"use client"

import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js"
import { CreateOrderActions, CreateOrderData, type OnApproveActions, type OnApproveData } from "@paypal/paypal-js"
import { payapalCheckPayment, setTransactionId } from "@/actions"
import { toast } from "sonner"

interface Props {
    orderId: string
    amount: number
}

export const PayPalButton = ({ orderId, amount }: Props) => {

    const [{ isPending }] = usePayPalScriptReducer()
    const roundedAmount = (Math.round(amount * 100)) / 100

    if (isPending) {
        return (
            <>
                <div className=" animate-pulse mb-4">
                    <div className="h-10 mr-18 bg-gray-300 rounded" />
                </div>
                <div className=" animate-pulse">
                    <div className="h-10 mr-18 bg-gray-300 rounded" />
                </div>
            </>
        )
    }

    const createOrder = async (data: CreateOrderData, actions: CreateOrderActions): Promise<string> => {

        const transactionId = await actions.order.create({
            intent: 'CAPTURE',
            purchase_units: [
                {
                    invoice_id: orderId,
                    amount: {
                        currency_code: 'USD',
                        value: `${roundedAmount}`,
                    }
                }
            ]
        })

        const { ok, message } = await setTransactionId(orderId, transactionId)
        if (!ok) {
            toast.error(message)
        } else {
            toast.success(message)
        }

        return transactionId
    }

    const onApprove = async (data: OnApproveData, actions: OnApproveActions) => {
        const details = await actions.order?.capture()
        if (!details) return;

        const { ok, message } = await payapalCheckPayment(details.id!)
        if (ok) {
            toast.success(message)
        } else {
            toast.error(message)
        }
    }

    return (
        <div className=" relative z-0">
            <PayPalButtons
                createOrder={createOrder}
                onApprove={onApprove}
                style={{
                    layout: 'vertical', // 'vertical' también es opción
                    color: 'blue',
                    shape: 'pill',
                    label: 'pay',
                }}
            />
        </div>
    )
}
