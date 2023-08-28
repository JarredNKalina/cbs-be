import { squareClient } from "../../.."

export async function retrieveAllServices() {
	const services = await squareClient.catalogApi.listCatalog(undefined, "ITEM")
	if (!services.result.objects) throw new Error("No services found")

	const returnServices = services.result.objects.map(service => {
		if (!service.itemData) throw new Error("No services found")
		const { variations, ...itemDataWithoutVariations } = service.itemData
		return {
			...service,
			itemData: itemDataWithoutVariations,
		}
	})
    
	return returnServices
}
