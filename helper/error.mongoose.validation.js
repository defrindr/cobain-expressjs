module.exports = function (mongoose) {
  let msg = mongoose.Error.messages;

  msg.DocumentNotFoundError = null;

  msg.general = {};
  msg.general.default =
    "Validator failed for path `{PATH}` with value `{VALUE}`";
  msg.general.unique = "Duplikasi data `{VALUE}` pada kolom `{PATH}`";
  msg.general.required = "Kolom `{PATH}` harus di isi.";

  msg.Number = {};
  msg.Number.min = "Kolom `{PATH}` ({VALUE}) kurang dari ({MIN}).";
  msg.Number.max = "Kolom `{PATH}` ({VALUE}) lebih besar dari ({MAX}).";
  msg.Number.enum = "`{VALUE}` is not a valid enum value for path `{PATH}`.";

  msg.Date = {};
  msg.Date.min =
    "Path `{PATH}` ({VALUE}) is before minimum allowed value ({MIN}).";
  msg.Date.max =
    "Path `{PATH}` ({VALUE}) is after maximum allowed value ({MAX}).";

  msg.String = {};
  msg.String.enum = "`{VALUE}` is not a valid enum value for path `{PATH}`.";
  msg.String.match = "Nilai kolom `{PATH}` tidak cocok ({VALUE}).";
  msg.String.minlength =
    "Panjang kolom `{PATH}` (`{VALUE}`) kurang dari ({MINLENGTH}) karakter.";
  msg.String.maxlength =
    "Panjang kolom `{PATH}` (`{VALUE}`) lebih dari ({MAXLENGTH}) karakter.";
};
