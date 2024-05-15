/**
 * The Blogs component of the website.
 *
 * @author: Hao Chen
 * @version: 1.0
 */

import React from "react";
import BreadCrumb from "./BreadCrumb";
import Meta from "../Components/Meta";
import Blog from "../Components/Blog";

export const blogData = [
  {
    id: "1",
    date: "17, April, 2024",
    title: "Amazon starts selling smart grocery carts to other retailers",
    description:
      "Amazon will begin selling its smart grocery carts to other retailers, the company said Wednesday, marking its latest bid to turn its Dash Cart technology into a service...",
    image: "images/news.webp",
    url: "https://www.cnbc.com/2024/04/17/amazon-starts-selling-smart-grocery-carts-to-other-retailers.html",
  },
  {
    id: "2",
    date: "14, May, 2024",
    title: "Home Depot misses on revenue, as high interest rates hurt sales",
    description:
      "Home Depot on Tuesday posted quarterly revenue below Wall Streets expectations, as shoppers postponed bigger discretionary projects like bath and kitchen remodels because of higher interest rates and made spring purchases late...",
    image: "images/homedepot.webp",
    url: "https://www.cnbc.com/2024/05/14/home-depot-hd-q1-2024-earnings-.html",
  },
  {
    id: "3",
    date: "14, May, 2024",
    title:
      "Chinese giant Alibaba posts 86% profit drop but beats revenue expectations",
    description:
      "Alibaba posted a beat on revenue in its fiscal fourth quarter ended March, even as the Chinese e-commerce giant’s net profit plunged sharply....",
    image: "images/alibaba.webp",
    url: "https://www.cnbc.com/2024/05/14/alibaba-baba-earnings-q4-2024.html",
  },
  {
    id: "4",
    date: "14, May, 2024",
    title:
      "GameStop, AMC shares jump another 60% in premarket trading as meme stock craze returns",
    description:
      "Shares of GameStop and AMC jumped around 60% in premarket trading on Tuesday, on track to extend gains after “Roaring Kitty,” the man at the center of the meme stock craze, posted online for the first time in roughly three years...",
    image: "images/gamestop.webp",
    url: "https://www.cnbc.com/2024/05/14/gamestop-amc-shares-jump-another-40percent-in-premarket-trading-as-meme-stock-craze-returns.html",
  },
];
const Blogs = () => {
  return (
    <>
      <Meta title="Blogs" />
      <BreadCrumb title="Blogs" />
      <div className="blog-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-3">
              <div className="filter-card mb-3">
                <h3 className="filter-title">Categories</h3>
                <div>
                  <ul className="ps-0">
                    <li>Electronics</li>
                    <li>Fashion</li>
                    <li>Home Products</li>
                    <li>Skin Care</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-9">
              <div className="row">
                {blogData.map((blog) => (
                  <div className="col-6 mb-3" key={blog.id}>
                    <Blog
                      date={blog.date}
                      title={blog.title}
                      description={blog.description}
                      image={blog.image}
                      url={blog.url}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Blogs;
