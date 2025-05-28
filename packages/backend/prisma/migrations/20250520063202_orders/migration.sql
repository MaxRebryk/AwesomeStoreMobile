-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("uid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrdersDetail" ADD CONSTRAINT "OrdersDetail_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "Order"("order_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrdersDetail" ADD CONSTRAINT "OrdersDetail_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Products"("uid") ON DELETE CASCADE ON UPDATE CASCADE;
