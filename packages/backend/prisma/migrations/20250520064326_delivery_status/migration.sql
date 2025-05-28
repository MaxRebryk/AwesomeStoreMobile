-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "delivery_status" "DeliveryStatus" NOT NULL DEFAULT 'PENDING',
ALTER COLUMN "total_amount" SET DATA TYPE DOUBLE PRECISION;
