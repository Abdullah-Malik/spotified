# Category Class

This class provides methods to interact with the Spotify Web API and retrieve information about categories used to tag items in Spotify.

## Methods

### getSingleBrowseCategory(categoryId: string, params?: GetSingleBrowseCategoryOptionalParams)

This method is used to get information about a single category used to tag items in Spotify.

#### Endpoint: [/browse/categories/{category_id}](https://developer.spotify.com/documentation/web-api/reference/get-a-category)

#### Parameters:

- `categoryId` (required): A string representing the Spotify category ID for the category.
- `params` (optional): An object containing optional parameters to be included in the request. This includes:
  - `locale`: The desired language, consisting of an ISO 639-1 language code and an ISO 3166-1 alpha-2 country code, joined by an underscore.

#### Return: `Category`

The `Category` object contains the following properties:
- `href`: A string containing the Spotify API endpoint for this category.
- `icons`: An array of `Image` objects representing the category icon in various sizes.
- `id`: A string containing the Spotify ID for the category.
- `name`: A string with the name of the category.

#### Example

```typescript
const category = await spotified.category.getSingleBrowseCategory('dinner', { locale: 'en_US' });
console.log(category.name);
console.log(category.icons[0].url);
```

### getSeveralBrowseCategories(params?: GetSeveralBrowseCategoryParams)

This method is used to get a list of categories used to tag items in Spotify.

#### Endpoint: [/browse/categories](https://developer.spotify.com/documentation/web-api/reference/get-categories)

#### Parameters

- `params` (optional): An object containing optional parameters to be included in the request. This includes:
  - `locale`: The desired language, consisting of an ISO 639-1 language code and an ISO 3166-1 alpha-2 country code, joined by an underscore.
  - `limit`: The maximum number of categories to return. Default: 20. Minimum: 1. Maximum: 50.
  - `offset`: The index of the first category to return. Default: 0 (the first object). Use with limit to get the next set of categories.

#### Returns

A promise that resolves to a `CategoryList` object, which contains:
- `categories`: An object with the following properties:
  - `href`: A string containing the Spotify API endpoint for the list of categories.
  - `items`: An array of `Category` objects.
  - `limit`: A number indicating the maximum number of items in the response (as set in the query or by default).
  - `next`: A string containing the URL to the next page of items (null if none).
  - `offset`: A number indicating the offset of the items returned (as set in the query or by default).
  - `previous`: A string containing the URL to the previous page of items (null if none).
  - `total`: The total number of items available to return.

#### Example

```typescript
const categoryList = await spotified.category.getSeveralBrowseCategories({ limit: 10, locale: 'en_US' });
console.log(`Total categories: ${categoryList.categories.total}`);
categoryList.categories.items.forEach(category => {
    console.log(`${category.name} (${category.id})`);
});
```