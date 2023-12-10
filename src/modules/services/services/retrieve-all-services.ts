import { squareClient } from "../../.."

export async function retrieveAllServices() {
	const services = await squareClient.catalogApi.listCatalog(undefined, "ITEM")
	if (!services.result.objects) throw new Error("No services found")

	const returnServices = services.result.objects.map(item => {
		if (!item.itemData?.variations) throw new Error("No variations found")

		const parsedItem = {
			...item,
			version: Number(item.version),
			variation: {
				...item.itemData?.variations[0],
				version: Number(item.version),
				itemVariationData: {
					...item.itemData?.variations[0].itemVariationData,
					priceMoney: {
						amount: Number(
							item.itemData?.variations[0].itemVariationData?.priceMoney?.amount
						),
						currency:
							item.itemData?.variations[0].itemVariationData?.priceMoney?.currency,
					},
					serviceDuration: Number(
						item.itemData?.variations[0].itemVariationData?.serviceDuration
					),
				},
			},
		}

		delete parsedItem.itemData?.variations

		return parsedItem
	})

	return returnServices
}
