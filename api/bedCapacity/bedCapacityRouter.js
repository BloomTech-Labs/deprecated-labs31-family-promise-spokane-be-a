// Endpoint for Total Number of beds at the shelter
const express = require('express');
const authRequired = require('../middleware/authRequired');

const Beds = require('./bedsModel');
const router = express.Router();

router.get('/', authRequired, function (req, res) {
  Beds.findAll()
    .then((beds) => {
      res.status(200).json(beds);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err.message });
    });
});

//get a bed by log id
// router.get('/:id', function (req, res) {
//   const log_id = String(req.params.id);
//   Beds.findById(log_id)
//     .then((beds) => {
//       if (beds) {
//         res.status(200).json(beds);
//       } else {
//         res.status(404).json({ error: 'beds Not Found' });
//       }
//     })
//     .catch((err) => {
//       res.status(500).json({ error: err.message });
//     });
// });

// router.post('/', async (req, res) => {
//   const beds = req.body;
//   if (beds) {
//     const id = beds['family_id'] || 0;
//     try {
//       await beds.findByFamilyId(id).then(async (pf) => {
//         if (pf) {
//           console.log(pf);
//           //beds not found so lets insert it
//           await Beds.create(beds).then((beds) =>
//             res.status(200).json({ message: 'beds created', beds: beds[0] })
//           );
//         } else {
//           res.status(400).json({ message: 'family id doesnt exist!' });
//         }
//       });
//     } catch (e) {
//       console.error(e);
//       res.status(500).json({ message: e.message });
//     }
//   } else {
//     res.status(404).json({ message: 'beds missing' });
//   }
// });

router.put('/', authRequired, (req, res) => {
  const bed = req.body;
  if (bed) {
    Beds.findAll()
      .then(
        Beds.update(bed)
          .then((updated) => {
            res
              .status(200)
              .json({ message: `note beds updated`, beds: updated[0] });
          })
          .catch((err) => {
            res.status(500).json({
              message: `Could not update beds`,
              error: err.message,
            });
          })
      )
      .catch((err) => {
        res.status(404).json({
          message: `Could not find beds`,
          error: err.message,
        });
      });
  }
});

// router.delete('/', (req, res) => {
//   const bed = req.body;
//   try {
//       Beds.remove(bed).then(() => {
//           res.status(200).json({ message: `beds were deleted`, beds: bed});
//       })
//       .catch (err) {
//           res.status(500).json({ message: `Could not delete beds`, error: err.message, })
//       }
//   }
// });

module.exports = router;
