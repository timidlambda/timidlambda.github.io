
Date.prototype.yyyymmdd = function() {
  var mm = this.getMonth() + 1; // getMonth() is zero-based
  var dd = this.getDate();

  return [this.getFullYear(),
          (mm>9 ? '' : '0') + mm,
          (dd>9 ? '' : '0') + dd
         ].join('-');
};

F = f => {
  c = fs.readFileSync(f, 'utf-8');
  title = c.match(/title:[ ]+(.*)/)[1];
  date = new Date(c.match(/created:[ ]+(.*)/)[1]);
  slug = date.yyyymmdd() + '-' + title.toLowerCase().replace(/ /g, '-').replace(/[^a-zA-Z\-]/g, '');
  c2 = c.replace(/^\.\.\./m, '---').replace(/^title/m, 'layout:    post\ntitle');
  fs.writeFileSync(slug + '.md', c2, 'utf-8');
};

fs.readdirSync('.').filter(f => f.match(/\.mmd$/)).map(F);
