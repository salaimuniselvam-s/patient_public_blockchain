export default function handler(req, res) {

  if (req.method !== "POST") {
    res.status(500).send({ message: 'Only post method' })
    return

  } else {
    const {username, etherId} = req.body
    if (username == 'john') {
      res.status(200).json({ message: 'Saved successfully', code: '001' })
    }
    else if (username == 'hospital') {
      res.status(200).json({ message: 'Saved successfully', code: '002' })
    }
    else if (username == 'pharma') {
      res.status(200).json({ message: 'Saved successfully', code: '003' })
    }
    else {
      res.status(404).send({ message: 'Unauthorised User' })
      return;
    }
  }
  }
  