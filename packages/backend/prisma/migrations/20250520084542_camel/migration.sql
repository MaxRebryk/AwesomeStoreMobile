/*
  Warnings:

  - The primary key for the `Order` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `delivery_status` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `order_id` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `payment_status` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `total_amount` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `Order` table. All the data in the column will be lost.
  - The primary key for the `OrdersDetail` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `order_detail_id` on the `OrdersDetail` table. All the data in the column will be lost.
  - You are about to drop the column `order_id` on the `OrdersDetail` table. All the data in the column will be lost.
  - You are about to drop the column `price_at_purchase` on the `OrdersDetail` table. All the data in the column will be lost.
  - You are about to drop the column `product_id` on the `OrdersDetail` table. All the data in the column will be lost.
  - The required column `orderId` was added to the `Order` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `totalAmount` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Order` table without a default value. This is not possible if the table is not empty.
  - The required column `orderDetailId` was added to the `OrdersDetail` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `orderId` to the `OrdersDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `priceAtPurchase` to the `OrdersDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productId` to the `OrdersDetail` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_user_id_fkey";

-- DropForeignKey
ALTER TABLE "OrdersDetail" DROP CONSTRAINT "OrdersDetail_order_id_fkey";

-- DropForeignKey
ALTER TABLE "OrdersDetail" DROP CONSTRAINT "OrdersDetail_product_id_fkey";

-- AlterTable
ALTER TABLE "Order" DROP CONSTRAINT "Order_pkey",
DROP COLUMN "delivery_status",
DROP COLUMN "order_id",
DROP COLUMN "payment_status",
DROP COLUMN "total_amount",
DROP COLUMN "user_id",
ADD COLUMN     "deliveryStatus" "DeliveryStatus" NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "orderId" TEXT NOT NULL,
ADD COLUMN     "paymentStatus" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "totalAmount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL,
ADD CONSTRAINT "Order_pkey" PRIMARY KEY ("orderId");

-- AlterTable
ALTER TABLE "OrdersDetail" DROP CONSTRAINT "OrdersDetail_pkey",
DROP COLUMN "order_detail_id",
DROP COLUMN "order_id",
DROP COLUMN "price_at_purchase",
DROP COLUMN "product_id",
ADD COLUMN     "orderDetailId" TEXT NOT NULL,
ADD COLUMN     "orderId" TEXT NOT NULL,
ADD COLUMN     "priceAtPurchase" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "productId" TEXT NOT NULL,
ADD CONSTRAINT "OrdersDetail_pkey" PRIMARY KEY ("orderDetailId");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("uid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrdersDetail" ADD CONSTRAINT "OrdersDetail_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("orderId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrdersDetail" ADD CONSTRAINT "OrdersDetail_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Products"("uid") ON DELETE CASCADE ON UPDATE CASCADE;
