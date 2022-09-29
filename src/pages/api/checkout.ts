import { NextApiRequest, NextApiResponse } from 'next';

import { stripe } from '../../lib/stripe';

type CreactCheckoutData = {
  priceIds?: string[]
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405)
  }

  const { priceIds } = req.body as CreactCheckoutData

  if (!priceIds) {
    return res.status(400).json({ error: 'Price not found' })
  }

  if (priceIds.length === 0) {
    return res.status(400).json({ error: 'Must have at least 1 price' })
  }

  const successUrl = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`
  const cancelUrl = `${process.env.NEXT_URL}/`

  const line_items = priceIds.map((priceId) => {
    return {
      price: priceId,
      quantity: 1
    }
  })

  const checkoutSession = await stripe.checkout.sessions.create({
    success_url: successUrl,
    cancel_url: cancelUrl,
    mode: 'payment',
    line_items
  })

  return res.status(201).json({
    checkoutUrl: checkoutSession.url
  })
}
