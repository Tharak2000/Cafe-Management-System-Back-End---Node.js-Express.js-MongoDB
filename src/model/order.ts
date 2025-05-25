import mongoose, {Schema, Types} from "mongoose";

interface OrderItem {
    itemId: Types.ObjectId; 
    quantity: number;
    price: number;
}

interface Order {
    customerId: Types.ObjectId; 
    date: Date;
    status: string;
    total: number;
    orderItems: OrderItem[];
}

const OrderItemSchema = new Schema<OrderItem>({
    itemId: { type: Schema.Types.ObjectId, required: true, ref: 'Item' },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
});

const OrderSchema = new Schema<Order>({
    customerId: { type: Schema.Types.ObjectId, required: true, ref: 'Customer' }, 
    date: { type: Date, default: Date.now },
    status: { type: String, enum: ['pending', 'completed', 'cancelled'], default: 'completed' },
    total: { type: Number, required: true },
    orderItems: { type: [OrderItemSchema], required: true },
});

const Order = mongoose.model('Order', OrderSchema);
export default Order;
