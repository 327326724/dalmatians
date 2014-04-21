
/**
* @description ��̬���ڲ����࣬��װϵ�����ڲ�������
* @return {object} ���ز�������
*/
var dateUtil = {
  /**
  * @description ���ֲ�����
  * @return {string} ���ش���������
  */
  formatNum: function (n) {
    if (n < 10) return '0' + n;
    return n;
  },
  /**
  * @description ���ַ���ת��Ϊ���ڣ�֧�ָ�ʽy-m-d ymd (y m r)�Լ���׼��
  * @return {Date} �������ڶ���
  */
  parse: function (dateStr, formatStr) {
    if (typeof dateStr === 'undefined') return null;
    if (typeof formatStr === 'string') {
      var _d = new Date(formatStr);
      //����ȡ��˳������ַ���
      var arrStr = formatStr.replace(/[^ymd]/g, '').split('');
      if (!arrStr && arrStr.length != 3) return null;

      var formatStr = formatStr.replace(/y|m|d/g, function (k) {
        switch (k) {
          case 'y': return '(\\d{4})';
          case 'm': ;
          case 'd': return '(\\d{1,2})';
        }
      });

      var reg = new RegExp(formatStr, 'g');
      var arr = reg.exec(dateStr)

      var dateObj = {};
      for (var i = 0, len = arrStr.length; i < len; i++) {
        dateObj[arrStr[i]] = arr[i + 1];
      }
      return new Date(dateObj['y'], dateObj['m'], dateObj['d']);
    }
    return null;
  },
  /**
  * @description�����ڸ�ʽ��Ϊ�ַ���
  * @return {string} ���ø�ʽ���ַ���
  */
  format: function (date, format) {
    if (arguments.length < 2 && !date.getTime) {
      format = date;
      date = new Date();
    }
    typeof format != 'string' && (format = 'Y��M��D�� HʱF��S��');
    return format.replace(/Y|y|M|m|D|d|H|h|F|f|S|s/g, function (a) {
      switch (a) {
        case "y": return (date.getFullYear() + "").slice(2);
        case "Y": return date.getFullYear();
        case "m": return date.getMonth() + 1;
        case "M": return dateUtil.formatNum(date.getMonth() + 1);
        case "d": return date.getDate();
        case "D": return dateUtil.formatNum(date.getDate());
        case "h": return date.getHours();
        case "H": return dateUtil.formatNum(date.getHours());
        case "f": return date.getMinutes();
        case "F": return dateUtil.formatNum(date.getMinutes());
        case "s": return date.getSeconds();
        case "S": return dateUtil.formatNum(date.getSeconds());
      }
    });
  },
  // @description �Ƿ�ΪΪ���ڶ��󣬸÷��������пӣ�ʹ����Ҫ����
  // @param year {num} ���ڶ���
  // @return {boolean} ����ֵ
  isDate: function (d) {
    if ((typeof d == 'object') && (d instanceof Date)) return true;
    return false;
  },
  // @description �Ƿ�Ϊ����
  // @param year {num} ��������ݻ���Ϊһ��dateʱ��
  // @return {boolean} ����ֵ
  isLeapYear: function (year) {
    //����Ϊʱ���ʽ��Ҫ����
    if (dateUtil.isDate(year)) year = year.getFullYear()
    if ((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0)) return true;
    else return false;
  },

  // @description ��ȡһ���·ݵ�����
  // @param year {num} ��������ݻ���Ϊһ��dateʱ��
  // @param year {num} �·�
  // @return {num} ��������
  getDaysOfMonth: function (year, month) {
    if (dateUtil.isDate(year)) {
      month = year.getMonth(); //ע��˴��·�Ҫ��1����������Ҫ��һ
      year = year.getFullYear();
    }
    return [31, dateUtil.isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
  },

  // @description ��ȡһ���·�1�������ڼ���ע���ʱ���·ݴ���ʱ��Ҫ������һ
  // @param year {num} ��������ݻ���Ϊһ��dateʱ��
  // @param year {num} �·�
  // @return {num} ����һ��Ϊ���ڼ�0-6
  getBeginDayOfMouth: function (year, month) {
    if ((typeof year == 'object') && (year instanceof Date)) {
      month = year.getMonth(); //ע��˴��·�Ҫ��1
      year = year.getFullYear();
    }
    var d = new Date(year, month, 1);
    return d.getDay();
  }
};









