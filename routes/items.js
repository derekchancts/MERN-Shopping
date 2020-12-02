const router = require('express').Router();
const Item = require('../models/Item');
const auth = require('../middleware/auth');



router.get('/', async (req, res) => {
  try {
    const items = await Item.find().sort({ date: -1 })
    if(!items || items.length <=0) throw new Error("No Items")

    res.json(items)
  } catch (err) {
    res.status(400).json({ msg: err.message })
  }
 
});



router.post('/', auth, async (req, res) => {
  // const { name } = req.body;
  const newItem = new Item({
    name: req.body.name
  });

  try {
    const item = await newItem.save();
    if (!item) throw Error('Something went wrong saving the item');
    res.status(200).json(item);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
  
});



router.delete('/:id', auth, async (req, res) => {
  const id = req.params.id;

  try {
    // should use findOneAndDelete
    // problem - if id doesn't exist, it still returns true
    // await Item.findOneAndDelete({ _id: id });   
    // await Item.findByIdAndDelete({ _id: id });  
    
    await Item.findById(id)
      .then(item => item.remove())
      .then(() => {
        res.status(200).json({ 
          success: true,
          msg: "item deleted" 
        });
      })
  } catch (err) {
    res.status(404).json({ 
      success: false,
      msg: err.message 
    });
  }

})


module.exports = router;


