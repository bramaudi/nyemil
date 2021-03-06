import './style.css'
import { m } from 'minite'

/** @jsx m */
/** @jsxFrag 'x' */
export default (props) => {
  // Inherit state & setter from parent (menu component)
  const { foods, drinks, cartShow, cartPop } = props.state
  const { setCartShow, setFoods, setDrinks } = props.set

  // Compouted property
  const cart = [...foods, ...drinks].filter(item => item.count > 0)
  const cartTotal = cart.reduce((a, { count }) => a + count, 0)
  const cartPrice = cart.reduce((a, { price, count }) => a + (price * count), 0)

  // const showUnique = (value, index, self) => {
  //   return self.indexOf(value) === index
  // }

  const handleDecrementProduct = (item) => {
    setFoods(foods.map(n => {
      if (n.name === item.name) {
        n.count -= 1
      }
      return n
    }))

    setDrinks(drinks.map(n => {
      if (n.name === item.name) {
        n.count -= 1
      }
      return n
    }))
  }

  const handleCheckout = (list, total, price) => {
    const cart = {
      list: [],
      total,
      price
    }
    list.map(item => {
      if (item.count) {
        cart.list.push(item)
      }
    })
    alert(JSON.stringify(cart));
  }

  return (
    <>
      {cartShow ? (
        <div className="full-cart shadow">
          <div className="close" onClick={() => setCartShow(false)}>
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </div>

          <div className="list">
            {cart.map(item => (
              <div className="list-item">
                {item.name}
                <span>Rp.{item.price} x {item.count}</span>
                <button
                  className="button decrement"
                  onClick={() => handleDecrementProduct(item)}
                  >
                  <svg fill="none" stroke="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path></svg>
                </button>
              </div>
            ))}
          </div>

          <div className="bill">
            <div>
              <div>Jumlah: &nbsp; <strong>{cartTotal}</strong></div>
              <div>Harga: &nbsp; <strong>Rp.{cartPrice}</strong></div>
            </div>
            <button
              className="button checkout"
              onClick={() => handleCheckout(cart, cartTotal, cartPrice)}
              >
              <svg fill="none" stroke="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
              Checkout
            </button>
          </div>
        </div>
      ) : (
        <div className="cart shadow">
          <div className="desc">
            <div className={cartPop && 'pop'}>Jumlah: &nbsp; <strong>{cartTotal}</strong></div>
            <div className={cartPop && 'pop'}>Harga: &nbsp; <strong>Rp.{cartPrice}</strong></div>
          </div>
          <button className="button see-cart" onClick={() => setCartShow(!cartShow)}>
            <svg fill="none" stroke="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
          </button>
        </div>
      )}
    </>
  )
}