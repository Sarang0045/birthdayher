# A little birthday magic

A small, static birthday website. No build step or dependencies are needed. Open `index.html` in a browser, or publish this folder with any static site host.

## Make it yours

- In `index.html`, edit the greeting and the paragraphs inside `.letter-copy` to add her name and your own birthday message.
- Memory lane has 26 hanging frames, preloaded with the photos in `photos/optimized/`. Choose **Add photos** to fill empty frames in order. Click any filled frame to view it large; use **Replace this photo** to change it.
- Photos chosen in the page are stored privately in that browser and remain after refresh. They are not uploaded and will not appear on a different device.
- To include more photos in the shareable site, add web-sized copies to `photos/optimized/` and append their paths to `bundledPhotos` in `script.js`. Keep the originals in `photos/`.
- Edit the `memoryMoments` list in `script.js` to change the decorative symbols in empty frames.

The breeze can be dragged onto the candle (or tapped), the knife can be dragged across the cake (or tapped), and the two little characters take turns sharing a bite.

- Before opening memory lane, she can write a birthday wish. It appears as a keepsake at the top of the memory page.

- When she saves a wish, the page opens a Gmail draft addressed to `sarangchoudhary0045@gmail.com`. She still needs to press **Send** in Gmail.
