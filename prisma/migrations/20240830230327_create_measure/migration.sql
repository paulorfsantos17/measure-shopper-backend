-- CreateTable
CREATE TABLE "measure" (
    "id" TEXT NOT NULL,
    "customer_id" TEXT NOT NULL,
    "measured_at" TIMESTAMP(3) NOT NULL,
    "measure_Value" INTEGER NOT NULL,
    "measure_type" TEXT NOT NULL,
    "measure_confirmed" BOOLEAN NOT NULL,
    "image_url" TEXT NOT NULL,

    CONSTRAINT "measure_pkey" PRIMARY KEY ("id")
);
