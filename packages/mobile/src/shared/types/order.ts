export enum PaymentStatus {
	ALL = 'ALL',
	PENDING = 'PENDING',
	COMPLETE = 'COMPLETE',
	FAILED = 'FAILED',
}

export enum DeliveryStatus {
	ALL = 'ALL',
	PENDING = 'PENDING',
	IN_TRANSIT = 'IN_TRANSIT',
	DELIVERED = 'DELIVERED',
}

export type DateFilter = 'all' | 'asc' | 'desc';
