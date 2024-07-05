declare module globalThis {
  import type BlobStream from 'blob-stream'

  // eslint-disable-next-line vars-on-top, no-var
  var blobStream: BlobStream
}
