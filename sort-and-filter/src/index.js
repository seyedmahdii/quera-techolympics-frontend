function filterAndSortProducts(products, criteria) {
  let result = products;
  const categories = criteria.categories || [];
  const minPrice = criteria?.priceRange?.min;
  const maxPrice = criteria?.priceRange?.max;
  const nameMinP = criteria?.nameLength?.min;
  const nameMaxP = criteria?.nameLength?.max;
  const keywords = criteria?.keywords || [];
  const sortBy = criteria?.sortBy || [];

  if (categories.length) {
    result = result.filter((item) => categories.includes(item.category));
  }
  if (minPrice) {
    result = result.filter((item) => item.price >= minPrice);
  }
  if (maxPrice) {
    result = result.filter((item) => item.price <= maxPrice);
  }
  if (nameMinP && nameMaxP) {
    result = result.filter(
      (item) => item.name.length >= nameMinP && item.name.length <= nameMaxP
    );
  }
  if (keywords.length) {
    result = result.filter((item) => {
      return keywords.some((keyword) => item.name.includes(keyword));
    });
  }
  if (sortBy.length) {
    sortBy.map((sortItem) => {
      let field = sortItem.field;
      let order = sortItem.order;
      if (order === "ascending") {
        result = result.sort((a, b) => a[field] - b[field]);
      } else {
        result = result.sort((a, b) => b[field] - a[field]);
      }
    });
  }

  return result;
}

module.exports = { filterAndSortProducts };
