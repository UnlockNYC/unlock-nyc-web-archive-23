<img src="https://cdn.glitch.me/dee07edd-bb63-4ffa-a606-d074a910b9c4%2FunlockSmall.png?v=1633719693017" alt="unlock nyc logo">

# 🗂️ archive! this site was live 2020 - Dec, 2023

**welcome!** Unlock NYC builds digital tools to make the apartment search process transparent, fair, and free from discrimination for all New Yorkers. 

🤖🏡 This project hosts our main website.

---

### platforms

- **front-end/CMS:** we use [Forestry](https://forestry.io) to edit content in Markdown files. Any changes in Forestry are automatically committed to this repo.

- **deployment/hosting:** we use [Netlify](https://netlify.com) to serve the website over the net - it's automatically set up to trigger a build whenever anything in this repo changes.

- **static site generator:** this site is built with [11ty](https://www.11ty.dev/)! 

- **staging/back-end edits:** we use [Glitch](https://www.glitch.com) to make edits, preview and share them, and then export them to this repo.

- **functions:** we use Netlify functions to authenticate advocates who have logins and are reporting on behalf of others 

### project structure

- in the`_includes` folder, you'll find all the site's template files, written in [Liquid](https://github.com/Shopify/liquid).  When 11ty runs, it uses these files to generate HTML pages and stores them in a folder called `build.` You won't see the `build` folder in this repo! It's generated every time 11ty runs, and hidden via the `.gitignore` file.

- the rest of the `.md` files are the content, either pulled from various places (for example, the `bios` folder holds content that gets displayed on the About page, via the `about.liquid` template) or simply from the root folder. 11ty takes any Markdown file and turns it into a folder with a corresponding `index.html`. For example, `press.md` turns into a folder (`/press`) with an index (`/press/index.html`) inside it, so that the URL `https://weunlock.nyc/press` works.

- the `styles` folder holds `site.css` - other css files are inside the `_includes` folder, so that they can be pulled onto specific pages via Liquid templates. When they are pulled via template files, the css files are minified.  

- the `scripts` folder holds any site-wide javascript

- `.eleventy.js` is the 11ty configuration file - it sets the output folder to `build`, and allows for the `styles` and `scripts` folders to be bundled into the output folder too so we can use them.
 
### installation & contributing

- you can <a href="https://glitch.happyfox.com/kb/article/23-what%E2%80%99s-remix/" target="_blank">Remix</a> this [project in Glitch](https://glitch.com/edit/#!/unlock-nyc-web), to create your own `dev` environment to play with. This will install everything from `package.json`, all dependencies and configurations, etc. When you make a change in Glitch, it automatically runs 11ty and generates the static site on the Glitch URL only.

- alternatively, you can use https://unlock-nyc-web.glitch.me as a staging environment - as long as you use branches in case multiple Unlock people are working on it at once!

- before working in Glitch, **make sure the project is up-to-date with the Github repo first!!** This is important - Forestry writes content and Markdown edits to the Github repo automatically, but this does not sync with the Glitch project. You need to find the **Tools** menu in the lower left, choose "Import and Export," and then "Import from Github."

- when you are ready to push changes to the website, choose the **Tools** menu again, and this time "Export to Github." This will create a branch called `glitch` in the Github repo, and you can create a pull request to double-check your changes before merging with the `main` production branch. You should delete the `glitch` branch when you are finished.

- once you merge to `main`, the changes are deployed automatically via Netlify. You can check the Netlify dashboard to follow the status of the deploy/build.

### documentation you might want to read

- [Forestry documentation](https://forestry.io/docs/welcome/) - for configuring the CMS

- [11ty documentation](https://www.11ty.dev/docs/config/) - there's so much here, if you go digging! 

- [Glitch to Github example](https://github.com/hsudml/glitch)

### fun tools you might need

🛠 feel free to add to this list!

### 🤖✊thanks!
