import { add, formatRFC3339 } from "date-fns"
import { squareClient } from "../../.."
import { SearchAvailabilityRequest } from "square"

export async function retrieveAvailability(serviceId: string, teamMemberId?: string) {
	const DATE_PLUS_ONE_DAY = add(new Date(Date.now()), { days: 1 })
	const DATE_PLUS_32_DAYS = add(new Date(Date.now()), { days: 32 })
	const availabilityQuery: SearchAvailabilityRequest = {
		query: {
			filter: {
				startAtRange: {
					startAt: formatRFC3339(DATE_PLUS_ONE_DAY),
					endAt: formatRFC3339(DATE_PLUS_32_DAYS),
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
			all: [teamMemberId],
		}
	}
	const availability = await squareClient.bookingsApi.searchAvailability(availabilityQuery)

	return availability.result.availabilities
}
