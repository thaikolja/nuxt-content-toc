/**
 * @fileoverview Content Version Detection Composable
 * @description Detects whether the application is using @nuxt/content v2 or v3
 * at runtime by checking for the presence of version-specific APIs.
 *
 * @module useContentVersion
 */

/**
 * Content module version identifier.
 * @typedef {'v2' | 'v3'} ContentVersion
 */
export type ContentVersion = 'v2' | 'v3'

/**
 * Detects the installed version of @nuxt/content at runtime.
 *
 * @description
 * This composable checks for the presence of version-specific APIs:
 * - **v3**: Uses `queryCollection()` for SQL-backed content queries
 * - **v2**: Uses `queryContent()` for file-based content queries
 *
 * @returns {ContentVersion} The detected content module version ('v2' or 'v3')
 *
 * @example
 * ```vue
 * <script setup lang="ts">
 * const version = useContentVersion()
 * console.log(`Using @nuxt/content ${version}`)
 * </script>
 * ```
 */
export function useContentVersion(): ContentVersion {
  // In Nuxt 4+, we can check for the presence of v3-specific composables
  // queryCollection is the primary API in v3, while queryContent is v2
  try {
    // Check if queryCollection exists (v3 API)
    // @ts-expect-error - We're checking for runtime availability
    if (typeof queryCollection === 'function') {
      return 'v3'
    }
  }
  catch {
    // queryCollection not available, fall through to v2 check
  }

  // Default to v2 if queryCollection is not found
  // queryContent is available in both v2 and v3 for backwards compatibility
  return 'v2'
}

export default useContentVersion
