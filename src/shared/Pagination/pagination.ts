interface PaginationInfo {
  page: number;
  limit: number;
  currentPageSize: number;
  nextPage: number | null;
  prevPage: number | null;
  data: any[]; // Change 'any' to the type of your product data
}

function calculatePagination(
  products: any[],
  page: number,
  limit: number,
): PaginationInfo {
  return {
    page,
    limit,
    currentPageSize: products.length,
    nextPage: page + 1,
    prevPage: page - 1,
    data: products,
  };
}

export default calculatePagination;
