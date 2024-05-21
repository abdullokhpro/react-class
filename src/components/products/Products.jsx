// import React, { Component } from "react";
// import "./products.scss";
// import axios from "axios";

// const API_URL = "https://dummyjson.com/products";

// export default class Products extends Component {
//   constructor() {
//     super(),
//       (this.state = {
//         data: null,
//         categories: null,
//         categoryValue: "/products",
//         offset: 1,
//         counter: 0,
//       });
//   }

//   componentDidMount() {
//     axios
//       .get(
//         `${API_URL} ${this.state.categoryValue}?limit=${this.state.offset * 2}`
//       )
//       .then((res) => this.setState({ data: res.data.products }))
//       .catch((err) => console.log(err));

//     axios
//       .get(`${API_URL}/products/categories`)
//       .then((res) => this.setState({ data: res.data.products }))
//       .catch((err) => console.log(err));
//   }

//   componentDidUpdate(prevProps, prevState) {
//     if (
//       this.state.offset !== prevState.offset ||
//       this.state.categoryValue !== prevState.categoryValue
//     ) {
//       axios
//         .get(
//           `${API_URL} ${this.state.categoryValue}?limit=${
//             this.state.offset * 2
//           }`
//         )
//         .then((res) => this.setState({ data: res.data.products }))
//         .catch((err) => console.log(err));
//     }

//     if (this.state.categoryValue !== prevState.categoryValue) {
//       this.setState({ offset: 1 });
//     }

//     if (this.state.counter !== prevState.counter) {
//       console.log("counter render 2");
//     }
//   }

//   render() {
//     return (
//       <div className="products">
//         <div className="container">
//           <h1 className="products__title">Products</h1>
//           <ul className="products__category">
//             <li className="products__item">
//               <data
//                 style={{
//                   background:
//                     this.state.categoryValue === "/products"
//                       ? "crimson"
//                       : "ddd",
//                 }}
//                 onClick={(e) =>
//                   this.setState({ categoryValue: e.target.value })
//                 }
//                 value="/products"
//               >
//                 All
//               </data>
//             </li>

//             {this.state.categories?.map((el) => (
//               <li key={el}>
//                 <data
//                   style={{
//                     background:
//                       this.state.categoryValue === `/products/category/${el}`
//                         ? "crimson"
//                         : "ddd",
//                   }}
//                   onClick={(e) =>
//                     this.setState({ categoryValue: e.target.value })
//                   }
//                   value={`/products/category/${id}`}
//                 ></data>
//               </li>
//             ))}
//           </ul>
//           <div className="products__cards">
//             {this.state.data?.map((el) => (
//               <div className="products__card">
//                 <div className="products__card__top" key={el.id}>
//                   <img
//                     className="products__card__img"
//                     src={el.images[0]}
//                     alt={el.title}
//                   />
//                 </div>
//                 <div className="products__card__bottom">
//                   <h3>{el.title}</h3>
//                   <p>{el.description}</p>
//                   <p>${el.price}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

import React, { Component } from "react";
import "./products.scss";
import axios from "axios";

const API_URL = "https://dummyjson.com";

export default class Products extends Component {
  constructor() {
    super();
    this.state = {
      data: null,
      categories: null,
      categoryValue: "/products",
      offset: 1,
      counter: 0,
    };
  }

  componentDidMount() {
    this.fetchProducts();
    this.fetchCategories();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.offset !== prevState.offset ||
      this.state.categoryValue !== prevState.categoryValue
    ) {
      this.fetchProducts();
    }

    if (this.state.categoryValue !== prevState.categoryValue) {
      this.setState({ offset: 1 }, () => this.fetchProducts());
    }

    if (this.state.counter !== prevState.counter) {
      console.log("counter render 2");
    }
  }

  fetchProducts() {
    axios
      .get(
        `${API_URL}${this.state.categoryValue}?limit=${this.state.offset * 2}`
      )
      .then((res) => this.setState({ data: res.data }))
      .catch((err) => console.log("Error fetching products:", err));
  }

  fetchCategories() {
    axios
      .get(`${API_URL}/products/categories`)
      .then((res) => this.setState({ categories: res.data }))
      .catch((err) => console.log("Error fetching categories:", err));
  }

  handleCategoryChange = (category) => {
    this.setState({ categoryValue: category, offset: 1 });
  };

  render() {
    return (
      <div className="products">
        <div className="container">
          <h1 className="products__title">Products</h1>
          <ul className="products__category">
            <li className="products__item">
              <button
                style={{
                  background:
                    this.state.categoryValue === "/products"
                      ? "crimson"
                      : "ddd",
                }}
                onClick={() => this.handleCategoryChange("/products")}
              >
                All
              </button>
            </li>

            {this.state.categories?.map((category) => (
              <li key={category}>
                <button
                  style={{
                    background:
                      this.state.categoryValue ===
                      `/products/category/${category}`
                        ? "crimson"
                        : "ddd",
                  }}
                  onClick={() =>
                    this.handleCategoryChange(`/products/category/${category}`)
                  }
                >
                  {category}
                </button>
              </li>
            ))}
          </ul>
          <div className="products__cards">
            {this.state.data?.products.map((product) => (
              <div className="products__card" key={product.id}>
                <div className="products__card__top">
                  <img
                    className="products__card__img"
                    src={product.images[0]}
                    alt={product.title}
                  />
                </div>
                <div className="products__card__bottom">
                  <h3>{product.title}</h3>
                  <p>{product.description}</p>
                  <p>${product.price}</p>
                </div>
              </div>
            ))}
          </div>
          <button
            className="see-more"
            onClick={() => this.setState({ offset: this.state.offset + 1 })}
          >
            See more
          </button>
        </div>
      </div>
    );
  }
}
