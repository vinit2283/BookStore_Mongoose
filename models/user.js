const { name } = require('ejs');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cart: {
        items: [{
            productId: {
                type: Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }]
    }
})

userSchema.methods.addToCart = function (product) {
    const cartProductIndex = this.cart.items.findIndex(cp => {
        return cp.productId.toString() === product._id.toString(); // where cp.productId is from updatedCartItems.push which is store 2 fields productId and quantity
        // where === match the type of the element but it didn't match the value, so that you can use == or simply conert into toString() to both.
    });
    let newQuantity = 1;
    const updatedCartItems = [...this.cart.items];

    if (cartProductIndex >= 0) {
        newQuantity = this.cart.items[cartProductIndex].quantity + 1;
        updatedCartItems[cartProductIndex].quantity = newQuantity;
    } else {
        updatedCartItems.push({
            productId: product._id,
            quantity: newQuantity
        });
    }
    const updatedCart = {
        items: updatedCartItems
    };
    this.cart = updatedCart;
    return this.save();
}

userSchema.methods.removeFromCart = function (productId) {
    const updatedCartItems = this.cart.items.filter(it => {
        return it.productId.toString() !== productId.toString(); // we don't use product._id because The cart already stores productId as an ObjectId 
        // If the IDs do not match, the product stays in the cart.
        // If they match, the product is removed.
    });
    this.cart.items = updatedCartItems; // The original this.cart.items still contains the removed product.By doing this.cart.items = updatedCartItems, we update the cart to store only the new filtered items.
    return this.save();
}

userSchema.methods.clearCart = function(){
    this.cart = {items: []};
    return this.save();
}

module.exports = mongoose.model('User', userSchema);