import { getPayload, Payload } from 'payload'
import config from '@payload-config'

let cached: Payload | null = null

export async function getPayloadClient(): Promise<Payload> {
  if (cached) {
    return cached
  }
  
  cached = await getPayload({ config })
  return cached
}

export const payload = {
  find: async (...args: Parameters<Payload['find']>) => {
    const client = await getPayloadClient()
    return client.find(...args)
  },
  findByID: async (...args: Parameters<Payload['findByID']>) => {
    const client = await getPayloadClient()
    return client.findByID(...args)
  },
  create: async (...args: Parameters<Payload['create']>) => {
    const client = await getPayloadClient()
    return client.create(...args)
  },
  update: async (...args: Parameters<Payload['update']>) => {
    const client = await getPayloadClient()
    return client.update(...args)
  },
  delete: async (...args: Parameters<Payload['delete']>) => {
    const client = await getPayloadClient()
    return client.delete(...args)
  },
}