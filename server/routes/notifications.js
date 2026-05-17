const express = require('express')
const router  = express.Router()
const admin   = require('../config/firebaseAdmin')

router.post('/send', async (req, res) => {
  const { tokens, title, body, data = {} } = req.body
  if (!tokens?.length) return res.status(400).json({ error: 'No tokens' })

  try {
    const response = await admin.messaging().sendEachForMulticast({
      tokens,
      notification: { title, body },
      data,
      webpush: {
        notification: { icon: 'https://app-babilin.web.app/icons/icon-192.png' }
      },
    })
    res.json({ ok: true, success: response.successCount, failed: response.failureCount })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

module.exports = router
