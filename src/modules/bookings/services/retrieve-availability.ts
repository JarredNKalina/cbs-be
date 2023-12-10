import { add, formatRFC3339 } from "date-fns"
import { squareClient } from "../../.."
import { SearchAvailabilityRequest } from "square"

export async function retrieveAvailability(serviceId: string, teamMemberId?: string) {
	const DATE_PLUS_ONE_DAY = add(new Date(Date.now()), { days: 1 })
	const DATE_PLUS_28_DAYS = add(new Date(Date.now()), { days: 28 })
	const location = await squareClient.locationsApi.listLocations()

	if (!location.result.locations) throw new Error("No locations found")

	const availabilityQuery: SearchAvailabilityRequest = {
		query: {
			filter: {
				locationId: location.result.locations[0].id,
				startAtRange: {
					startAt: formatRFC3339(DATE_PLUS_ONE_DAY),
					endAt: formatRFC3339(DATE_PLUS_28_DAYS),
				},
				segmentFilters: [
					{
						serviceVariationId: serviceId,
					},
				],
			},
		},
	}
	if (teamMemberId && availabilityQuery.query.filter.segmentFilters) {
		availabilityQuery.query.filter.segmentFilters[0].teamMemberIdFilter = {
			any: [teamMemberId],
		}
	}

	try {
		const availability = await squareClient.bookingsApi.searchAvailability(availabilityQuery)
		const availabilitiesReturn = availability.result.availabilities?.map(availability => {
			return {
				...availability,
				appointmentSegments: availability.appointmentSegments?.map(segment => {
					if (!segment) throw new Error("No segments found")
					return {
						...segment,
						serviceVariationVersion: Number(segment.serviceVariationVersion),
						durationMinutes: Number(segment.durationMinutes),
					}
				}),
			}
		})
		return availabilitiesReturn
	} catch (error) {
		console.log(error)
	}
}
